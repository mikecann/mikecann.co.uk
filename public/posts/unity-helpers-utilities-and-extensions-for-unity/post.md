---
coverImage: 'https://www.mikecann.co.uk/wp-content/uploads/2014/06/head.png'
date: '2014-06-03T03:23:45.000Z'
tags:
  - github
  - library
  - open-source
  - unity
  - utils
title: Unity Helpers - Utilities and Extensions for Unity
---

During the development of my up and coming game I have encountered some snags when developing in Unity so I wrote a number of utilities and extension methods to help out.

<!-- more -->

One such annoyance is the inability to use interfaces in GetComponent() and GetComponents(), so I wrote some extension methods to help with that:

[code lang="csharp"]
using UnityHelpers;

var obj = new GameObject();
obj.AddComponent&lt;MyComponent&gt;();

obj.Has&lt;MyComponent&gt;(); // Returns true or false
obj.Has&lt;IMyComponent&gt;(); // Can also handle interfaces

obj.Get&lt;MyComponent&gt;(); // Returns the first component
obj.Get&lt;IMyComponent&gt;(); // Returns the first component that implements the interface

obj.GetAll&lt;MyComponent&gt;(); // Gets all the components
obj.GetAll&lt;IMyComponent&gt;(); // Gets all the components that implement the interface
[/code]

Another utility is for adding children to GameObjects:

[code lang="csharp"]
using UnityHelpers;

var obj = new GameObject();

obj.AddChild(&quot;Mike&quot;); // Creates a new GameObject named &quot;Mike&quot; and adds it as a child

var player = obj.AddChild&lt;Player&gt;(&quot;Dave&quot;); // Creates a new GameObject named &quot;Dave&quot; and adds the component &quot;Player&quot; returning it

obj.AddChild(typeof(Player), typeof(Friendly), typeof(AI)); // Creates a new GameObject and adds a number of components
[/code]

There are many other utils and extensions, and more to come.

Checkout the source for more info: [https://github.com/mikecann/Unity-Helpers/tree/master/Scripts](https://github.com/mikecann/Unity-Helpers/tree/master/Scripts)

I have rigorously unit and battle tested these utils and [added them to Github](https://github.com/mikecann/Unity-Helpers) so I can use them in furthur projects. I hope they can be of some use to others too!
