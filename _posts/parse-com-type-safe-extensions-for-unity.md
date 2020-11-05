---
title: Parse.com Type-Safe Extensions for Unity
tags:
  - extensions
  - github
  - parse.com
  - Programming
  - test
  - unity
url: 4979.html
id: 4979
categories:
  - "C#"
  - Programming
  - Projects
  - Unity
coverImage: "https://www.mikecann.co.uk/wp-content/uploads/2014/05/header.png"
coverMeta: out
date: 2014-05-10 09:24:05
---

As mentioned in my [previous post](https://www.mikecann.co.uk/games/taming-unity/) I have been working on a multiplayer game built in Unity for a little while now. I ummed and ahhed over the technology choice for the backend for a little while before deciding to go with [Parse.com](https://Parse.com)'s library. The reason being that it looked simple to implement (they have a Unity SDK), they take care of all the backend headaches for me and the pricing model looked fair.

<!-- more -->

The Parse Unity library is okay, not as fully fleshed as some of the other languages they support but good enough for what I needed apart from one critical point, the lack of type-safety in the queries such as:

[code language="csharp"]
new ParseQuery&lt;Armor&gt;().WhereLessThanOrEqualTo(&quot;cost&quot;, 13);
[/code]

This annoyed me so much that I decided to write some extension methods that take advantage of Lambda functions to provide the type-safety. The above now becomes:

[code language="csharp"]
new ParseQuery&lt;Armor&gt;().WhereLessThanOrEqualTo(a =&gt; a.Cost, 13);
[/code]

The library can also handle chains such as

[code language="csharp"]
new ParseQuery&lt;Player&gt;().Include(p =&gt; p.Stats.Heath.Remaining); // becomes &quot;stats.health.remaining&quot;
[/code]

The library also handles interfaces by introducing a new attribute "ParseFieldType".

[code language="csharp"][parseclassname(&quot;father&quot;)]
public class Father : ParseObject, IFather
{
[ParseFieldName(&quot;daughter&quot;)][parsefieldtype(typeof(child))]
public IChild Daughter { get; set; }
}

new ParseQuery&lt;Father&gt;().Include(f =&gt; f.Daughter.Name); // becomes &quot;daughter.name&quot; and works because ParseFieldType redirects the chain to Child rather than IChild
[/code]

It can even handle lists

[code language="csharp"][parseclassname(&quot;father&quot;)]
public class Father : ParseObject, IFather
{
[ParseFieldName(&quot;children&quot;)][parsefieldtype(typeof(child))]
public List&lt;IChild&gt; Children { get; set; }
}

new ParseQuery&lt;Father&gt;().Include(f =&gt; f.Children[0].Name); // becomes &quot;children.name&quot;
[/code]

To get started go grab the .dll from my Github project for the library: [https://github.com/mikecann/Unity-Parse-Helpers](https://github.com/mikecann/Unity-Parse-Helpers)
