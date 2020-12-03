---
coverImage: /images/fallback-post-header.jpg
date: '2007-09-16T19:37:10.000Z'
tags: []
title: LieroXNA - Weapons and Forces
---

I have been working hard on LieroXNA this weekend and have managed to get quite abit of what I wanted done.

Firstly I worked on setting up a framework for weapons that allows them to be described by an external xml. This should reduce the effort involved in creating new weapons in the future. Taking a quick look at the XML that describes the rocket weapon you can see its straight forward but also pretty powerful:

<!-- more -->

&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; ?&gt;

&lt;weapon name=&quot;Rocket&quot; type=&quot;projectile&quot;&gt;
&nbsp;&nbsp;&nbsp; &lt;properties&gt;
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;texture&gt;rocket&lt;/texture&gt;
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;trail&gt;smoke&lt;/trail&gt;
&nbsp;&nbsp;&nbsp; &lt;/properties&gt;

&nbsp;&nbsp;&nbsp; &lt;events&gt;
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;onTerrainCollide&gt;
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;spawn type=&quot;explosion&quot; size=&quot;64&quot;&nbsp; where=&quot;this&quot; velocity=&quot;this&quot; /&gt;
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;spawn type=&quot;shrapnel&quot; quantity=&quot;10&quot;&nbsp; where=&quot;this&quot; velocity=&quot;this&quot; /&gt;
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;die/&gt;
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/onTerrainCollide&gt;
&nbsp;&nbsp;&nbsp; &lt;/events&gt;
&lt;/weapon&gt;

In addition I have been working on adding forces into the game. It took abit of tweaking but now explosions have a force which repels particles around it, you can see this in action in the video below. I have also added a &quot;vortex&quot; special weapon that sucks particles towards it which then swirl around until the vortex implodes expelling all the particles.

The size of the world has now been expanded and a simple camera has been added. Previously the intention was the world was to be split into multiple tiles of 1024x768 textures but i have now decided against that due to the level of complexity involved and gone for a system that uses one large texture (2048x2048 currently) instead. I have also changed the texture so its a little less &quot;programmer art&quot; as I was getting some stick for that :P

There is still alot of work to be done but im happy with the way it looks at the moment. You will have to excuse the video quality below, flash isnt the best compression for alot of fast moving small particles.

If you want to see a larger less compressed video (35meg) you can [download it HERE](https://www.mikecann.co.uk/Files/Upload/files/boom3.wmv).

<iframe width="853" height="480" src="https://www.youtube.com/embed/PVxXCl4tnsQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe>
