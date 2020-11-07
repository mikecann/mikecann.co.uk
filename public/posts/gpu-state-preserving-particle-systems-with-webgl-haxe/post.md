---
coverImage: 'https://www.mikecann.co.uk/wp-content/uploads/2011/10/gpu-preserve.png'
date: '2011-10-20T12:02:35.000Z'
tags:
  - complex
  - glsl
  - gpu
  - Hardware
  - haxe
  - Javascript
  - Particles
  - Programming
  - WebGL
title: GPU State Preserving Particle Systems with WebGL & HaXe
---

Well this is the post I didnt think was going to happen. I have been struggling for weeks with this little bit of tech, ill explain more about why it has been so difficult in another post. For now however, ill just talk about this sample.

<!-- more -->

So the idea was to build upon what I had been working with previously with my [stateless particles systems with WebGL and HaXe](https://mikecann.co.uk/programming/5000000-chrome-crawlers-why-not-haxe-webgl/). The intention from the start was to replicate some of my [very early work](https://mikecann.co.uk/university-projects/xnagpuparticles-1000000-dynamic-particles/) (from 2007) on state preserving particle systems in WebGL.

**Before I go any further, you can check it out in action here:
\*\***[https://mikecann.co.uk/projects/HaxeWebGLParticles/](https://mikecann.co.uk/projects/HaxeWebGLParticles/) \*\*

First a quick reminder. The difference between a stateless and state-preserving particle simulation is that in the latter we store and update the positions, velocities and other properties of each particle per frame, allowing us to interact and control the simulation. This differs from the stateless particle simulation (detailed in my[ previous post](https://mikecann.co.uk/programming/5000000-chrome-crawlers-why-not-haxe-webgl/)), where the position for each particle is calculated each frame based on a fixed algorithm.

A [fairly reccent addition](https://code.google.com/p/angleproject/issues/detail?id=95) to WebGL made this possible, namely texture lookups in the vertex shader (aka Vertex Texture Fetch). I wont go over the exact details how this makes state preserving particle systems possible as I have already documented it in [my earlier work](https://mikecann.co.uk/university-projects/xnagpuparticles-1000000-dynamic-particles/). A brief explanation is that it allows you to use the fragment shader to perform the updates on particle state stored in textures then use the vertex shader to map those states to a point-sprite vertex buffer.

Basically what this means is that the entire particle simulation can be contained and updated on the GPU, which means [no read-back](https://mikecann.co.uk/programming/5000000-chrome-crawlers-why-not-haxe-webgl/). This allows us to achieve simulations of **millions** of particles without too much difficulty (depending on GPU ofcourse).

**I have uploaded the source for people to perouse at their leisure**:
[https://github.com/mikecann/HaxeWebGLParticles](https://github.com/mikecann/HaxeWebGLParticles)

As usual it was written using the JS target of HaXe so it should be fairly easy to understand whats going on if you have written any Ecma-script-like-language. Im going to detail this in my next post, but the code isnt the best I have ever written as its a result of a mish-mash of various samples and examples I have found on the web. If anyone has any comments on things that are wrong or could be done better I would be very happy to hear about them.
