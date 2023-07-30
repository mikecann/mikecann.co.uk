---
coverImage: ./header.jpg
date: "2023-08-01T08:31:40.000Z"
tags:
  - tinkering
  - convex
  - typescript
  - projects
  - BaaS
title: Tinkering With Convex
---

Im not sure where I heard about [Convex](https://convex.dev) but after a quick read of the docs I became really excited and knew I would have to dive in a bit deeper.

# What is Convex?

[Convex](https://convex.dev) is a "Backend as a Service" (BaaS) platform similar to [Firebase](https://firebase.google.com/) or [Parse](https://parseplatform.org/) both of which I have been a fan of in the past but both of which have some fairly major shortcomings.

I wont go into too much detail about the platform here, but if you want to know more I strongly suggest checking out their [rather excellent docs](https://docs.convex.dev/home).

I learn best by implementing something so I thought about what little app I could build to test some of core features of the platofrm.

Then it hit me, why not build a Twitter clone. But not just any Twitter clone.. a Threads clone.. And because Twitter is now called X, thus "ThreadX" was born.

# Demo

[INSERT DEMO OF IT HERE]

If you want to play with it yourself you can find the application at: [https://threadx-app.netlify.app/](https://threadx-app.netlify.app/) and the source for the project at: [https://github.com/mikecann/ThreadX](https://github.com/mikecann/ThreadX)

# Things I love

There is so much to love with Convex that its hard to know where to start but as I mentioned previously I would recommend reading the docs, forming your own opinion, then diving in by building something small.

With that said however, here are some of the things that I like the most:

## Speed of development

My is it ever fast to build stuff with Convex! 

The demo app I built above (ThreadX) took me less than a day to put together and a whole bunch of that time was spent fighting with UI libraries and flexbox. If I didnt bother styling it it would have been done much sooner. 

Because Convex is a bundler, API layer, server-side route handerler, database AND client-side query handler then you get incredible synergies from all of that. 

For example here is the server-side mutation to send a message:

```ts 
export const send = mutation({
  args: {
    body: v.string(),
    imageId: v.optional(v.string()),
  },
  handler: async ({ auth, db, storage }, { body, imageId }) => {
    if (body.length > 1000) throw new Error("message too long");
    if (body.length < 5) throw new Error("message too short");
    const user = await getMe({ auth, db });
    await db.insert("messages", {
      body,
      authorId: user._id,
      likes: BigInt(0),
      replies: BigInt(0),
      imageId,
    });
  },
});
```

Then 7 seconds later Convex has checked and built the function and generated an API for me to call it

[![](./convex-build.png)](./convex-build.png)


```tsx
export const NewMessageModal: React.FC<Props> = ({ isOpen, onClose }) => {
 
  const sendMessage = useMutation(api.messages.send);  

  const onSend = () => {
       sendMessage({ body: text, imageId: storageId })
      .then(() => setText(""))
      .catch(onNonCriticalError);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      ...
        <Button
          css={{ transition: `all 0.2s ease` }}
          color={"gradient"}
          isDisabled={!text || isUploading}
          isLoading={isUploading}
          onClick={onSend}
        >
          Post
        </Button>
      ...
    </Modal>
  );
};
```
(shortened for brevity)

I cant overstate how good it feels to be able to go at this speed AND know that everything is scalable and ACID.

## Realtime updates

I have spent A LOT of time thinking about and coding up various realtime systems for both [BattleTabs](https://mikecann.co.uk/posts/battletabs-in-7-minutes) and other projects over the years and let me tell you, its never simple and never "just works". There are ALWAYS caveats and issues.

Some issues I have encountered before are: 

1. It works with individual entities, but doesnt work queries that involve lists of entities. 
2. [Its very inefficient / expensive](https://supabase.com/docs/guides/realtime/quotas)
3. [How do you scale](https://elixir-lang.org/blog/2020/10/08/real-time-communication-at-scale-with-elixir-at-discord/#:~:text=Starting%20technologies,while%20Python%20powered%20their%20API.) and maintain a massive list of websocket connections?
4. [It only works at the "application"](https://wundergraph.com/blog/deprecate_graphql_subscriptions_over_websockets) level so any other changes to the database (dashboard, migrations, other changes) arent captured.
5. [How do you have](https://the-guild.dev/blog/subscriptions-and-live-queries-real-time-with-graphql) a clean [developer experience](https://firebase.google.com/docs/firestore/query-data/listen) for this?

So when I saw with Convex I could simply write this on the server:

```ts
export const listAll = query({
  args: {},
  handler: async (context) => {
    const me = await findMe(context);
    const messages = await context.db
      .query("messages")
      .filter((q) => q.eq(q.field("isReplyToMessageId"), undefined))
      .take(10);
    return convertToDetailedMessage({ ...context, messages, me });
  },
});
```

and this on the client:

```ts
import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Spinner, VStack } from "@chakra-ui/react";
import { ListListsDoc } from "./AuthenticatedMessageLists";
import { Message } from "./messages/Message";

interface Props {
  list?: ListListsDoc;
}

export const AllMessages: React.FC<Props> = ({ list }) => {
  const messages = useQuery(api.messages.listAll) || [];
  if (!messages) return <Spinner />;
  return (
    <>
      {messages.map((message) => (
        <Message key={message._id.toString()} message={message} />
      ))}
    </>
  );
};
```

I was 🤯. 

This is the perfect developer experience in my opinion. You just declare the data you want in a simple to understand query and the platform takes care of the rest ensuring that "messages" is updated whenever there is something new or updated,

## Flexible type-safe database schema

I have been developing for [quite some time](https://mikecann.co.uk/about) now and over the years have encountered and worked with a great many databases. 

I started off with MySQL then hopped on MongoDB when NoSQL was all the rage then migrated over to Postgres when the sugar-high wore off. In-between I have used hosted DBs like Parse, DynamoDB and Firebase too.



Migrations are always a concern, but its great, literals so you can have "kinds" of things in the db. Its how I code typescript so feels really natural to pattern match against.

## No messing around with writing your own "API" layer

## Function args are runtime validated

## Sessions, RLS, Middleware, etc

because the way it works, all these can be handled really cleanly

https://github.com/get-convex/convex-helpers/

# Things I don't love

## No self-hosted version

Big negative if you ever want to walk away from the platform, but it has been promised and they are committed to it.

Sometimes internet is a bit flakey, slow.

## Requires internet connection

Both good and bad, but internet went down couldnt work.

## No enforced reference constraints

This means no cascading deletes

## No docs on testing

See my discord question about this, but its a bit limited right now

## External Auth provider via Clerk

Would prefer to have this all under the one umbrella, would make things a bit simpler on the function side too as currently you kind of have to "sync" between you external auth provider and your own "users" table

# Things that im not sure on

## Pricing

# Conclusion


