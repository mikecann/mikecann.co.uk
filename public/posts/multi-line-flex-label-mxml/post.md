---
coverImage: /images/fallback-post-header.jpg
date: "2010-11-28T19:14:10.000Z"
tags:
  - as3
  - Code
  - Component
  - Flex
  - label
  - MXML
  - Spark
  - tip
title: "Multi-Line Flex Label [MXML]"
---

Just stumbled across this one while writing some mxml for a personal project and thought I would share.

Have you ever wanted to have multi-line text in your label component in spark and thought the following should work?

```

&lt;s:Label text="I like text on the n next line" /&gt;

```

But all it produces is:

[![](/wp-content/uploads/2010/11/Shot_001.png "Shot_001")](/wp-content/uploads/2010/11/Shot_001.png)

Yep me too.

After some playing however I stumbled accross the following solution:

```

&lt;s:Label text="I like text on the {'n'} next line" /&gt;

```

It then produces the expected result:

[![](/wp-content/uploads/2010/11/Shot_0021.png "Shot_002")](/wp-content/uploads/2010/11/Shot_0021.png)

Im just guessing but I suspect its something to do with the black art of the flex life cycle. By adding the {'n'} we are turning the property initialisation on the label component from a simple literal assignment into a delayed binding assignment and therefore gets parsed differently.

Just a guess, let me know if im way off.
