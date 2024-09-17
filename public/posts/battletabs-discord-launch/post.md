---
coverImage: ./header.jpg
date: "2024-09-16T07:31:40.000Z"
tags:
  - battletabs
  - discord
  - business
  - gangbusters
title: BattleTabs Goes Global on Discord
---

For the [longest time](https://mikecann.co.uk/posts/battletabs-6-months-later) Ganbusters has been a Discord focused company. We use it as our primary method of interacting with our community, receiving bug reports and feature suggestions.

So when [we heard about](https://venturebeat.com/games/discord-launches-activities-with-light-games-and-a-new-app-store/) Discord's intention to make games playable within the app itself we knew that it was a strong opportunity for our game [BattleTabs](https://battletabs.com/).

Discord is a game-focused social platform that has many plays that are hanging out with friends and are searching for something to play together. So having our social multiplayer game embedded right there was a match made in heaven.

![](./battletabs-in-the-app-drawer.png)

In addition to reducing discovery friction for BattleTabs Discord also offers a number of other very compelling advantages. One of these compelling features (that we had been granted early access to) is the ability to Directly Message players. We currently use this as another Push Notification channel but its so much more powerful than that, we have barely scratched the surface of whats possible.

![](./discord-dms.png)

 Super fast and friction free Payments is another strong benefit for using Discord particularly over the web platform where the friction for paying for IAPs or subscriptions makes it super challenging to monetize games like ours. Discord even provides and app "store" where you can see all products that the game offers and directly purchase them without even opening the game.

 ![](./showing-the-store.png)

There many other strong reasons to be excited about the Discord Platform for games particularly when you read about the [incredible success](https://mojiworks.com/news/why-were-all-in-on-discord-activities) stories [from](https://a16z.com/discord-activities-social-gaming/) other [developers](https://discord.com/build-case-studies/frvr) you can see why we were keen to get on there.

Fast forward a year or two and after much hard work by [Brandon](https://www.gangbusters.io/about) we found ourself on the inner circle as one of Discords Developer Partners. The process to getting BattleTabs on Discord had begun. 

The first step was a "geo test" or soft launch focusing on Canada. This was an opportunity for discord to see how the game performed before they decided to take us forward to the global launch or not.

One of the key metrics Discord was looking for was "User Sentiment". This value is calculated by asking the user if they enjoyed the game after playing.

![](./happy-meme.png)

After two weeks or so of the game being available in Canada we sat down with Discord again and they told us the very exciting news that the game had done exceedingly well with a user sentiment much higher than required and as a result would like to take us to global launch. 

So we tee'd up 10am my time (Western Australia) last Tuesday (10th September) for the official global launch. 

# Tuesday 

After a brief call with Discord we go live! We immediately start to see our usual traffic numbers get obliterated.

![](./initial-spike-graph.png)

And this is where the fun started. To explain the issues we were soon to face I first have to explain the architecture for BattleTabs a bit. Checkout the following diagram:

![](./architecture1.png)

You see from the above diagram we have two different kinds of servers "web" servers are ones that users connect to via web sockets. These can scale out horizontally and generally arent a problem. 

The other kind is the "worker" server. This is a singleton server and was serving a lot of roles (foreshadowing). Some things it is responsible for:

+ Listen for "app events" and perform various things. Examples of these are things such as updating challenge progression or sending push notifications to users or awarding medals or updating league position etc etc
+ Polling the database checking for matchmaking, AI turn taking, daily shop reward rotation etc
+ Listen to database events and performing logic such as alerting the web servers who in turn update their subscribed users when their currency values changes (due to rewards or other things that can happen).
+ A heap of other things such as cheat detection, server metrics reporting, discord server bot management, discord live reporting etc etc

I was aware that the worker was a bottleneck in the architecture but up to now it hadnt been an issue. The worker usually sat at a very low CPU and memory level. 

Regardless I beefed the worker up to the largest size that [our hosting supported](https://fly.io/docs/about/pricing/). 

![](./worker-sitting-okay.png)

It was sitting at about 50% utilization for most of the day which was a bit high but I felt was within the bounds of comfort. So I went to bed at about 9 feeling happy about the launch so far.. little did I know what was coming..

![](./bed-time.png)

# Wednesday

I woke up in the morning to an absolute nightmare. The servers had clearly been having a bad time while I was asleep. I hopped on [our Discord Server](https://discord.gg/fTdxf4y9) and saw that many players were complaining about the game not working correctly. 

I took a look at my app events queue metrics and to my horror saw that there were over 3 million events in the queue waiting to be processed.

![](./3m-queued-events.png)

The number was decreasing but even after much tweaking of the various settings I calculated it was going to take 26 hours for my poor single worker server to clear those down on top of everything else it was dealing with. 

I felt like I didn't have much of of choice tho as before I could make any architectural changes I needed to clear down this queue or risk us potentially loosing data or causing more problems by handling events out of order.

![](./slack-to-brandon.png)

So although the game was in a semi-broken state I went to bed thinking that at least the queue should be just about cleared down by the morning and I could then get to work fixing everything properly.

# Thursday

![](./4m.png)

... well sh*t ... this isnt good. ..

It turns out while I was sleeping we had some "good" news from our friends at discord Discord..

![](./moving-you-up-to-rank-4.png)

Ah crap.. I knew at this point I was going to have to do something, this queue was never going to get cleared down by itself.

I asked Discord to drop us back down the list. As painful as it was to request LESS traffic I felt that I needed to buy us some breathing room a bit.

The next step was I knew I was going to have to parallelize that event queue processing to bring it down. 

So I created a new kind of server called an "eventsWorker", this server took much of the event processing work from the worker and critically this was able to be parallelized. 

![](./architecture2.png)

I was potentially risking some out of order event processing here as I went through each event very carefully and realized that there wasn't actually much event-order dependence particularly between users, anything that was dependant I could likely fix later. 

So that realization gave me a bit more confidence to scale up the number eventsWorkers instances. This however put a huge strain on the database so I scaled that up to the very largest that fly would allow.

![](./16-performance-core-db-pricing.png)

This allowed the eventsWorkers to 15 instances which begin to rip through the queue at over 1 million per hour. It should clear the entire thing by late afternoon.

So working under that assumption I got to work preparing the update that would go out after that queue had resolved. 

I decided I wanted to reduce as many of those places that were dependant on app events as I could thus reducing pressure on the background workers. 

After thinking about it for a bit I realized that most of the events could simply be processed "locally" instead of being send to the background. 

To explain what I mean lets take an example event `matchFinished` (by the way if you are curios [here are all the app events](https://gist.github.com/mikecann/c7ad434ffcf94eb4e5c0d0b30f7967e1) in the game) here are all the places this event is used:

+ BattleEventsService - to send push notifications to users letting them know the outcome of the battle
+ BattleWebhooksService - to send API messages out to our Tournaments bot so it can advance any running tournaments
+ BattleTabsLiveService - to update the #battletabs-live channel in Discord
+ HighScoresService - to update highscore stats
+ MedalAwardingService - to potentially award a user a new medal
+ UserChatDetectionService - to check to see if the user is potentially abusing the game by playing the same person multiple times
+ UserStatsService - to update a user's stats
+ TVChannelsService - to update any playing BattleTabsTV instances

Now each of these is a totally different feature in the game and not dependant on each other, this is why they are handled as events rather than inline function calls in the first place. 

When a battle was finished I would publish a `matchFinished` to the event queue ([managed by pgboss](https://github.com/timgit/pg-boss)) this would then back picked up by a background worker and do all that work mentioned above. 
 
I realized tho that instead of sending it to the background I could simply emit a "server event" in addition to the "app event". Then have each of those systems listen to the server event instead of the app event.  

This moved the computation burden from the background workers to the web workers which were able to easily scale horizontally. 

It seems so obvious now but hindsight is 20:20 of course and I had been so focused on client-side improvements for so long I had missed the obvious server side optimizations. To be fair it was only the fact that the increased traffic overwhelmed us that necessitated a change.

So shortly after 4pm the events had all been cleared down, I scaled the eventsWorkers down from 15 to 3 then pushed my "server events" change. 

This had an immediate effect of decreasing worker load but also increasing web server load. This wasn't a problem however as web servers were able to [auto-scale](https://fly.io/docs/reference/autoscaling/) up.

I went to bed feeling pretty good about things. I however told Brandon (who is based in the UK) to give me a call this time if the servers go down. 

I soon slept well pretty sure I would be getting a good nights sleep..

# Friday

3:14am I get call from Brandon letting me know that the game was down.

I jump out of bed and hop on my PC and sure enough things are not looking good and haven't been for a couple of hours

![](./friday-morning-graph.png)

This time it wasn't immediately obvious what was going wrong. It appeared that the worker process was still running out of memory. I attempted some desperate fixes but wasnt sure about the underlying reason.

![](./desperate-commit-log.png)

It was 4:30am now and my brain really wasnt working properly, it looked like things were sort of working so I decided to get an hour of sleep.

Awake and rested I realized what the problem might be. 

As I have mentioned above, one of the other responsibilities of the "worker" server was:

> Polling the database checking for matchmaking, AI turn taking, daily shop reward rotation etc

For example matchmaking works by every few seconds requesting a list of the open battle proposals then looping over that list and creating battles as needed. 

Turn timeouts, AI turn taking and a bunch of other systems worked in similar ways.

The issue is that this polling was effectively another kind of queue. If the number of rows I return from the database each poll is too small then that queue is going to build up. 

Unfortunately I had no metrics around these polling "queues" so my first task was to get some visibility into these. 

![](./poll-queue-growth-chart.png)

Sure enough those queues had grown to huge levels. 

Much like with my app events problem from before I knew the solution was going to be parallelization. 

So I very carefully moved the polling code over to the eventsWorker instances. I was very nervous about this as I knew that by allowing multiple servers to poll the database at once there was a high chance of race conditions and other problems due to polling overlaps. 

My solution was to very carefully place [distributed locks](https://github.com/mike-marcacci/node-redlock) around the place such that it was not possible for two different workers to be working on the same item from a polling queue at once.

This solution seemed to work very well and I soon had the polling queues back under control.

![](./polling-under-control-graph.png)

That was when disaster struck ..

![](./slack-to-brandon-wild-db-growth.png)

I had been keeping a close eye our database's growth over time as I knew that if we ran out of DB space that would put a hard stop to the game. 

Well it turns out with all the chaos of the past 12 hours I forgot to check the DB size and it looks like it had grown wildly and had finally run out of space and started refusing connections. 

Fortunately I was looking at the logs at the time when I saw this message go whizzing past:

![](./jobs-cannot-archive-log-message.png)

It looks like pgboss our app events queuing and jobs system was timing out when attempting to archive completed jobs. I ran a quick query against the database and sure enough there were over 7 million events rows waiting to be archived and a further 3 million events in the archive waiting to be deleted. 

It seems like pgboss was not designed to handle this scenario very well and was simply erroring out when it was running its archival and deletion routines. 

My solution as to manually delete all 10 million rows from the database immediately, this instantly dropped 70 gig from the DB. I then ran a [Postgres VACCUM](https://www.postgresql.org/docs/current/sql-vacuum.html) to clear up any other deleted tuples. 

Instantly the database came alive again and disaster was averted. 

Phew it had been a long day but I was feeling good about things now. I went to be certain everything was all good.

# Saturday

I woke up, hopped on my PC and to my dismay saw that my "worker stopped" alert had triggered.

![](./slack-message-alert-worker-stopped.png)

Fortunately it didn't take me long to track down that this time the worker hadn't actually gone down, instead the alert had triggered because [Axiom](https://axiom.co/) (our log aggregation tool) had stopped receiving log messages. This happened because our "[log shipper](https://github.com/superfly/fly-log-shipper)" instance had died. 

I still dont know why or how this happened but I quickly give it a poke and things were up and running again.

From the Grafana logs on the servers it appeared everything had been fine over night much to my relief. 

I think im going to leave the day-by-day commentary here but I think you have probably got a good sense of the kind of firefight I was putting up at this point.

# Lessons

So what lessons did I learn from all this?

1. Be wary of queues. Any time you feel like you are making something that might potentially get backed up if you 10 or 100x your traffic it would be wise to deal with it now or at the very least get some metrics around it so you can keep an eye on it.

2. Single points of failure are a bomb waiting to go off. For the same reasons above you really should be wary of any places that cannot be scaled horizontally. 

3. Use Axiom, its fast, cheap and powerful. Log everything and then build graphs.

![](./axiom-pricing.png)

500GB on the free tier! Thats just insane. 

To put that in perspective despite all the spam we were producing over the past week, over the lifetime of using Axiom we have amassed 54million log lines which amounts to just 17GB of space which only 1GB compressed!

![](./axiom-dataset-logs.png)

4. If you can, load test before you expect a large increase in traffic! Even if you cant easily hit the numbers you expect on your local machine it should hopefully hint towards where some of the bottlenecks might be.

# Conclusions & Thanks

Its still a bit early to talk about the results of all this traffic on the business but things are going well. 

I would like to thank the special people at Discord that took a chance with us and were very patient  while we fought through the problems :)

