---
title: Project Technology (Deformable Terrains)
url: 214.html
id: 214
categories:
  - 'C#'
  - LieroXNA
  - Projects
  - XNA
date: 2007-12-05 22:25:38
tags:
---

Well i got asked a question [in a comment](https://www.mikecann.co.uk/?p=208#comment-1333) on how the terrains work in the LieroXNA project so I thought i would do a quick post on this rather than reply in the comments.

The way the terrains work has changed a few times over the course of development of the project for various reasons mostly related to the incompatabilities of the 360 and my previous methods. I wont go into those previous methods here but if anyone reading this has any questions dont hesitate to ask in a comment or email me. I would also like to say this may not be the most efficient method as I was only getting the terrains up as a proof of concept first then was planning on refining later.

<!-- more -->

Before i can explain how the terrain is deformed i must first talk about how the terrain is composed. There are currently three layers to the level, an indestuctable layer, a destructable layer and a background layer.

<table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody>
        <tr>
            <td>
            <p align="center">![](https://mikecann.co.uk/wp-content/uploads/2007/12/test02_destr.png)

Destructable Layer

            </td>
            <td align="center">

![](https://mikecann.co.uk/wp-content/uploads/2007/12/test02_indestr.png)

Indestructable Layer

            </td>
        </tr>
    </tbody>

</table>
</p>

&nbsp;There is also a &quot;destroyed mask&quot; that is used to create areas at the start that have already been destroyed. This is mainly used so that you dont have to burrow for ages at the start to get to your opposition. Combined together you end up with the final result below.

<table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
    <tbody>
        <tr>
            <td>
            <p align="center">![](https://mikecann.co.uk/wp-content/uploads/2007/12/tempmask01.png)

Destroyed Mask

            </td>
            <td align="center">

![](https://mikecann.co.uk/wp-content/uploads/2007/12/test03_final.png)

Final Result

            </td>
        </tr>
    </tbody>

</table>
</p>

&nbsp;Each texture layer at the moment is 2048x2048 (which is the maximum texture resolution the 360 supports) and is in the format Color (8bpp). The indestructable and the destructable layer are then sent to the GPU for use in rendering and particle collisions by the GPU particle system.

Objects such as players and weapons that are updated by the CPU however cannot perform collision checks on a texture that is on the GPU (without calling getData() which causes read-back which is horribly slow). So the destructable and the instructable layers are duplicated in the initial load of the level and saved as a large two dimensional array of Colors on the CPU.

You may ask why waste memory by storing the full Color component on the CPU when only a single bit is required per pixel to determaine if the terrain is solid or not. The reason for this is that by storing the full color component exploded particles can become the colour of the terrain that they exploded from rather than all of them being the same color.

When an explosion occurs a few things need to take place to make the terrain deform correctly. A hole of the correct size must be cut away from the Texture on the GPU so that the particles react correctly to the deformed terrain, also this new hole must be mirrored in the collision data on the CPU so that the player doesnt collide with things they think are destroyed terrain.

Another 2048x2048 &quot;explosion map&quot; texture is used to handle the deformation of the GPU texture. A series of explosion masks have been created that represent each explosion size:

<table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody>
        <tr>
            <td align="center">
            <p>![](https://mikecann.co.uk/wp-content/uploads/2007/12/explosion32.png)

Exp32

            </td>
            <td align="center">

![](https://mikecann.co.uk/wp-content/uploads/2007/12/explosion64.png)

Exp64

            </td>
            <td align="center">

![](https://mikecann.co.uk/wp-content/uploads/2007/12/explosion128.png)

Exp128

            </td>
        </tr>
    </tbody>

</table>
</p>

&nbsp;When an explosion occurs it is added to a list of other explosions that have occured that frame. When the render of the level is called the list of explosions that have happened that frame are iterated through and rendered to the 2048x2048 &quot;explosion map&quot; map texture in the correct world location that the explosion occured. This &quot;explosion map&quot; is then passed to a texture render shader which using render targets updates the terrain texture:

float4 PixelShader(float2 texCoord : TEXCOORD0) : COLOR0

{

&nbsp;&nbsp; &nbsp;float4 outCol = float4(1,0,0,0);

&nbsp;&nbsp; &nbsp;float4 explosinCol = tex2D(ExplosionSampler, texCoord);

&nbsp;&nbsp; &nbsp;if (explosinCol.x!=0)

&nbsp;&nbsp; &nbsp;{

&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;outCol = tex2D(TextureSampler, texCoord);

&nbsp;&nbsp; &nbsp;}

&nbsp;&nbsp;&nbsp; float4 indestr = tex2D(IndestructableSampler, texCoord);

&nbsp;&nbsp;&nbsp; if (indestr.w!=0){ outCol = indestr;&nbsp; }

&nbsp;&nbsp; &nbsp;

&nbsp;&nbsp;&nbsp; return outCol;

}

Note how the shader takes into account the indestructable layer so that the explosion doest destroy parts of the indestructable level.

The CPU collision data 'texture' is updated at the time of the explosion. When game loads each explosion mask is duplicated on the CPU much in the same way the indestructable and the destructable layers are. When an explosion occurs each pixel in the CPU explosion mask is compared against the CPU destructable layer and depending if the pixel is &quot;indestructable&quot; or not the pixel is set to be destroyed.

If you remember from back at the start I talked about the &quot;Destroyed Mask&quot; but didnt explain how it destroyed the terrain. Well it basically acts as a large explosion mask. At the init of the level the Destroyed Mask is rendered to the &quot;explosion map&quot; giving it an initial destroyed appearence. The same is applied to the CPU.

And thats about it for how the terrain deformation works in the project at the moment. As i said i played around with many differnt ways of doing it including negative rendering and methods that dont involve using a 2048x2048 temporary buffer texture but for now this is the method that it uses.
