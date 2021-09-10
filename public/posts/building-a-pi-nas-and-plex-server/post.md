---
coverImage: ./header.jpg
date: "2021-09-10T07:31:40.000Z"
tags:
  - hardware
  - tinkering
  - linux
title: Building a Pi NAS and Plex Server
---

I have a PC, its a very nice and powerful PC but it has a habit of gobbling up power even if im not using it. So I wanted to build a low-powered NAS and Plex server so I can tuck my PC into bed at night and put it asleep but still enjoy some quality time with my content downstairs on the TV. Since I had a spare Raspberry Pi 4 glaring at me from my desk I thought, sure why not, how hard could it be?

<!-- more -->

# Requirements

- Low Power, its going to be on all day so it should just sip from the fountain of joules
- Quiet, its going to live in my office, don't want it bothering me with its whining all the time
- Flexible, I have a bunch of old drives, I want to just sling them in there and have them all just work and contribute to one large pool of "stuff"
- Redundant, im not storing my sons baby pics on it or anything but I would rather not loose the stuff on there either, so some sort of redundancy would be nice.
- Powerful, it doesnt need to be a super computer but it needs to have enough juice to transcode a 4k video

# Software

[Unraid](https://unraid.net/) would have been the ideal choice for my requirements but it requires an x86 CPU and the Pi is ARM so unfortunately thats a non starter.

So I decided to just go with the standard Raspbian OS, I [grabbed the ISO](https://www.raspberrypi.org/software/) smashed it on an SD card and got cracking. I setup [SSH and VNC](https://www.raspberrypi.org/documentation/computers/configuration.html) for easy access then assigned a [static IP address to the Pi using the Google Home app](https://support.google.com/wifi/answer/6274660?hl=en-AU).

After a bunch of research and experimentation (which I will not bore you with) I decided to go with [Open Media Vault](https://www.openmediavault.org/) (OMV) as my main way of managing the Pi. It provides a nice UI and set of plugins smoothing the way like a butter coated bar of soap.

A video by the rather nerdy but very helpful [Techno Dad Life](https://www.youtube.com/channel/UCX2Vhc0LIzSS9aMzhGFZ7PA) got me going with UnionFS which merges disks together so they appear as one large file system and SnapRAID which gives me a simple way to provide redundancy to the NAS:

<iframe width="853" height="480" src="https://www.youtube.com/embed/FYkdPyCt5FU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

The final step was to install Plex. I read a bunch of guides with installing it using OMV but they all seemed overly complicated involving Docker or other things. I found that [simply installing it natively using SSH](https://pimylifeup.com/raspberry-pi-plex-server/) worked just great.

Im making this sound all rather straight forward but by this point I had spent many nights and headaches on getting it all to work. But finally I now had a system that had a single large file system that I could access from across the network. The drives were resistant to failure thanks to SnapRAID.

Next up was the hardware issues.

# Hardware

- not enough power on USB
- buying powred usb expensive
- the plastic container
