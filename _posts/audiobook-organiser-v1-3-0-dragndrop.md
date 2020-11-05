---
title: AudioBook Organiser v1.3.0 - Drag'n'Drop
tags:
  - Actionscript
  - Audiobook
  - Drag-Drop
  - Flex
  - iTunes
  - Programming
  - Projects
  - Utility
url: 856.html
id: 856
categories:
  - Actionscript
  - Audiobook Organiser
  - Programming
  - Projects
date: 2010-01-12 00:07:04
---

[![](https://mikecann.co.uk/wp-content/uploads/2010/01/ScreenHunter_04-Jan.-11-22.36.jpg "ScreenHunter_04-Jan.-11-22.36")](https://mikecann.co.uk/wp-content/uploads/2010/01/ScreenHunter_04-Jan.-11-22.36.jpg)

Well I was just doing some audio book organising and realised that it would be great if I could drag and drop a folder straight from my AIR into iTunes ready for upload to my iPhone.

<!-- more -->

Anyways after a little searching through the docs I came up with this little ditty:

var cp : Clipboard = new Clipboard();
cp.setData(ClipboardFormats.FILE_LIST_FORMAT, [new File(book.url)], false);
NativeDragManager.doDrag(null,cp);

<div>Which gets fired by my DataGrid in the view:</div>

<div>&lt;mx:DataGrid width="100%" height="100%" dataProvider="{books}" editable="true"</div>
<div>  itemEditEnd="{dispatchEvent(new BooksEvent(BooksEvent.PROPERTY_CHANGED));}"</div>
<div>  dragEnabled="true"</div>
<div>  dragStart="{dispatchEvent(new BooksEvent(BooksEvent.BOOK_BEGIN_DRAG, AudioBookModel(event.currentTarget.selectedItem)))}"&gt;</div>
<div>Its pretty cool.</div>
<div>Anyways, the latest version and the source is below:</div>
<div>

[airbadge]Audio Book Orgainser,https://www.mikecann.co.uk/flash/AudioBookOrganiser/AudioBookOrganiser.air,1,https://www.mikecann.co.uk/flash/AudioBookOrganiser/badgeImg.jpg[/airbadge]
Source: [https://www.mikecann.co.uk/flash/AudioBookOrganiser/AudioBookOrganiser_v130_source.zip](https://www.mikecann.co.uk/flash/AudioBookOrganiser/AudioBookOrganiser_v130_source.zip)

</div>
