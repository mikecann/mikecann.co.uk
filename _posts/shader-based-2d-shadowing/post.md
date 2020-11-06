---
title: Shader Based 2D Shadowing
tags:
  - 2d
  - community
  - hlsl
  - Programming
  - shader
  - shadow
  - university
  - XNA
url: 1206.html
id: 1206
categories:
  - "C#"
  - HLSL
  - Programming
  - XNA
date: 2010-08-15 11:10:18
---

[![](https://mikecann.co.uk/wp-content/uploads/2010/08/11_scene.png "11_scene")](https://mikecann.co.uk/wp-content/uploads/2010/08/11_scene.png)

Those who know me know I used to do [quite abit of development](https://mikecann.co.uk/?s=xna) in c# using Microsoft's XNA platform.

<!-- more -->

Well I like to check back in every now and then with some of the big players in the community to see what's going on.

One of those players is [Catalin Zima](https://www.catalinzima.com/), who is famous for producing many great shader and effect samples.

One of Catalin's reccent project particularly caught my eye however as I had tried to tackle the same problem several years ago when I was in my final year of university. That is, Dynamic 2D Shadows Calculated on the GPU ([https://mikecann.co.uk/university-projects/shadowshader-in-rendermonkey/](https://mikecann.co.uk/university-projects/shadowshader-in-rendermonkey/))

[Catalin's approac](https://www.catalinzima.com/2010/07/my-technique-for-the-shader-based-dynamic-2d-shadows/)h to the problem is far more elegant that my brute force iterative approach. He uses a clever technique of distorting the desired casting image about the light in such a way as not to require iterative pixel lookups.

If you are interested in the more details in the technique I encourage you to check it out over on Catalin's blog: [https://www.catalinzima.com/2010/07/my-technique-for-the-shader-based-dynamic-2d-shadows/](https://www.catalinzima.com/2010/07/my-technique-for-the-shader-based-dynamic-2d-shadows/)
