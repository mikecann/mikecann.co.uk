---
coverImage: /images/fallback-post-header.jpg
date: '2010-08-02T08:25:14.000Z'
tags:
  - behaviour
  - code
  - expected
  - flex4
  - group
  - programming
  - rollover
  - spark
  - video
title: Flex 4 Spark & Rollover Group Containing Rect
---

Was working on my top-secret Flex-based project over the weekend when I discovered something I hadn't come across before.

<!-- more -->

The issue is that when you have a Spark Rect GraphicsElement within a Spark Group it seems that the rollover event of the group is triggered even though the mouse doesn't roll over the Rect.

Here is a video I made to explain my issue on Twitter:

<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="700" height="550" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="https://www.youtube.com/v/9Ku4xY7vfyw&amp;hl=en_GB&amp;fs=1?hd=1" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="700" height="550" src="https://www.youtube.com/v/9Ku4xY7vfyw&amp;hl=en_GB&amp;fs=1?hd=1" allowscriptaccess="always" allowfullscreen="true"></embed></object>

The code in the video is as follows:

```

&lt;s:WindowedApplication xmlns:fx="https://ns.adobe.com/mxml/2009"
xmlns:s="library://ns.adobe.com/flex/spark"
xmlns:mx="library://ns.adobe.com/flex/mx"&gt;

    &lt;s:Group rollOver="trace('ya')"&gt;
    	&lt;s:Rect x="100" y="100" width="20" height="20"&gt;
    		&lt;s:fill&gt;
    			&lt;s:SolidColor color="0x00ff00" /&gt;
    		&lt;/s:fill&gt;
    	&lt;/s:Rect&gt;
    &lt;/s:Group&gt;

&lt;/s:WindowedApplication&gt;

```

It turns out (after [posting the issue on the Adobe Forums](https://forums.adobe.com/message/3017631#3017631)) that I was simply missing the "mouseEnabledWhereTransparent" property on the Group. Setting it to false causes the mouse to perform a hit-test rather than a simple bounds check. Thank you Mr Shongrunden for pointing this out to me :)

So this now works:

```

&lt;s:WindowedApplication xmlns:fx="https://ns.adobe.com/mxml/2009"
   xmlns:s="library://ns.adobe.com/flex/spark"
   xmlns:mx="library://ns.adobe.com/flex/mx"&gt;

	&lt;s:Group rollOver="trace('ya')" mouseEnabledWhereTransparent="false"&gt;
		&lt;s:Rect x="100" y="100" width="20" height="20"&gt;
			&lt;s:fill&gt;
				&lt;s:SolidColor color="0x00ff00" /&gt;
			&lt;/s:fill&gt;
		&lt;/s:Rect&gt;
	&lt;/s:Group&gt;

&lt;/s:WindowedApplication&gt;

```

I hope this helps someone else out!
