---
title: Coder Tidbit 01
url: 207.html
id: 207
categories:
  - Misc
  - Programming
date: 2007-11-09 11:22:10
tags:
---

Keep coming across things like this at work that make me stop and think for a while so i thought they would be interesting to post up here for others to think about too.

<!-- more -->

Heres one i came accross today that was causing a strange error in the game:

[code lang="java"]
boolean a = true;
if(a){ System.out.println("HERE1"); } { System.out.println("HERE2"); }
[/code]

Which one is printed? HERE1 or HERE2 or both?

If a = false which is printed?
