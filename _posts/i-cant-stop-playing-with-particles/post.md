---
title: I cant stop playing with particles..
url: 194.html
id: 194
categories:
  - 'C#'
  - LieroXNA
  - Projects
  - XNA
date: 2007-09-12 20:48:14
tags:
---

<div>Well I have been at it again, tweaking and altering the particles in LieroXNA. You can see a video of my results below.</div>
+ Particles now represent the pixel they exploded from. i.e. if the terrain was green the particle is green, if it was blue the particle is blue etc.
+ Particles are now more white (hot) depending on how fast and how old they are.
+ Particles now explode in a circular direction and less randomly (looks more like an explosion).
+ Particles now have a direction from which they are exploded, at the moment is just current mouse position - last mouse position but in the future this will be used to blow particles away from a high energy collision.
+ Particles now react to the player. I realised that instead of just passing in the terrain texture to the particle update routine i could pass the entire back buffer allowing the player and any other objects in the scene to have particle reactions, yey!
+ Particles now have a bit of alpha blending to make them look a little less in focus, not sure if this works well, let me know :)
<object width="640" height="505"><param name="movie" value="https://www.youtube.com/v/o_QgvZojDyc&amp;hl=en_GB&amp;fs=1?rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="https://www.youtube.com/v/o_QgvZojDyc&amp;hl=en_GB&amp;fs=1?rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="505"></embed></object>
