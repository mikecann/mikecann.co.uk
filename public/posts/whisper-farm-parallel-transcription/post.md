---
coverImage: ./header.jpg
date: "2024-06-06T07:31:40.000Z"
tags:
  - ai
  - code
  - convex
  - flyio
  - whisper
  - audio
  - tailwind
  - typescript
  - bun
  - shadcnui
title: Whisper Farm - Parallel Transcription
---

I really enjoy reading [Ian Macartney's](https://stack.convex.dev/author/ian-macartney) on the Convex blog and when I saw his post about [Work Stealing](https://stack.convex.dev/work-stealing) a strategy for distributing compute heavy workloads I decided I wanted to have a play with it myself..

# TLDR;

Checkout the demo video below to see what I built:

<iframe width="100%" height="400" src="https://www.youtube.com/embed/sovYE3sWszY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Code: [https://github.com/mikecann/whisper-farm](https://github.com/mikecann/whisper-farm)

# Whisper Farm

The idea was to see if I can speed up podcast transcription by parallelizing "chunking" the task up into separate "jobs" then performing each in parallel on [Fly.io's GPU machines](https://fly.io/gpu).

Each Fly.io machine is a single docker container that contains a Whisper binary provided by [whisper-standalone-win](https://github.com/Purfview/whisper-standalone-win), an [FFmpeg](https://github.com/kribblo/node-ffmpeg-installer) binary and a nodejs "worker" that runs either "chunking" or "transcription" jobs.

To orchestrate all this I used [Convex](https://convex.dev) which is an excellent backend as a service that I have written about [many times before](https://mikecann.co.uk/tags/convex).

# Challenges

This project was actually quite a bit more challenging than I thought it would be at first.

Much of the difficulties I faced were Docker and Fly.io related, the Convex part was generally problem free.

## Docker

I am a long way from a Docker expert and as such this fact caused me many headaches when attempting to package up the Whisper model and code.

I started off in high hopes after reading [this blog post](https://fly.io/blog/transcribing-on-fly-gpu-machines/) from Fly. Unfortunately I quickly ran into the issue that I didnt want to run this as a standalone container, instead I wanted to run my worker code along side it so that I could startup and scale machines without having to also worry about scaling whisper machines which would complicate things and increase costs. I wanted a worker to be a self-contained standalone thing.

It turns out doing this is docker is not easy. I thought it would be simple to "simply" merge two Dockerfiles. It appears this is not the case :P

To cut a long story short what I ended up doing was abandoning the merging approach and instead use a [whisper binary](https://github.com/Purfview/whisper-standalone-win) and instead just dynamically download and unzip that when the container is constructed.

The next issue I faced was that I found my docker image getting very large, on the order of 15 gig or so. This was causing all kinds of problems on the Fly side. Machines wouldnt start for unknown reasons or would just take a long time. In the end I assumed it was because the images were so large but Fly wasn't particularly helpful with its errors on this one.

So how to make a Docker image smaller? Well ChatGPT give me a great bit of info I didn't know about Docker containers. Every time you use the "RUN" command it creates a new layer in the image. So by re-arranging the order I ran the RUN commands and also combining some RUN's together I was able to take it down from 15GB to 5GB

[![](./dockerimagesize.png)](./dockerimagesize.png)

I think what this experience taught me is that I need to do a bit more reading / watching videos around Docker, there is clearly some learnings that I still need here.

# UI - Shadcn & Tailwind

So another side-quest I went on for this project was to experiment with "the new hotness" in web UI design.

[![](./shadcnui.png)](./shadcnui.png)

[Shadcn/ui](https://ui.shadcn.com/) is all the rage at the moment. The main idea is that you "copy and paste" the component code directly into your project then directly modify the component yourself effectively creating your own component library.

Shadcn uses Tailwind to do the styling. I have put off using Tailwind for a while as I have never been a massive fan on "[stringly typed](https://wiki.c2.com/?StringlyTyped)" things but I decided to give it a crack as it seems like just about everyone and their cat uses Tailwind these days.

My conclusions?

Im not sold. Sorry if this offends you.

I still dont like the stringly typed nature of Tailwind. I have to bring in so many other third party tools to try to make it work such as prettier-plugin-tailwindcss and extra linting rules. Additional there are pains around combining className attributes so you have to use additional libraries like tailwind-merge and class-variance-authority just to make it work in a sane way. not to mention that Tailwind requires its own compiler / toolchain sigh.

Shadcn/ui is also another dud for me. On one hand I do like the copy paste nature of the UI there and you can in theory get things going quite quick. I just found myself getting frustrated that the copy-paste component is missing a heap of things I have come to expect from my UI library.

Also when it comes time to actually making changes to the components, you open one up and..

[![](./tailwind.png)](./tailwind.png)

... cool cool cool cool cool cool

# Issues and Future Work

So back to the point of this post.

I got this to the point that I feel like I had proven out the concept and learnt a bunch along the way. I think if I wanted to take this futher there would be a bunch more work needed. In no particular order:

- The transcription result might be larger than the 1mb row limit in the database (https://docs.convex.dev/production/state/limits) so we might have to store it as a file instead
- There is virtually no error handling around fly machines starting up etc, so this is definately required to make sure we can recover from errors
- There is not much in the way of testing at all at the moment, so this makes me a bit nervous about the fragile code
- In addition to the above the code is rather messy and really could do with tidying up
- There is no authorization or authentication in place so this is obviously not great
- There is no limits on the number of workers that can be started, so this could be a problem
- The UI is really very basic and could do with a lot of work and is more of an experiment than anything else for me to tinker with Shadcn and Tailwind
