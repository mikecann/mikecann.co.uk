---
coverImage: /images/fallback-post-header.jpg
date: '2010-10-31T18:50:22.000Z'
tags:
  - caption
  - extension
  - preformat
  - tumblr
  - update
title: Post To Tumblr Version 0.4
---

[![](/wp-content/uploads/2010/10/Shot_0012.png "Shot_001")](/wp-content/uploads/2010/10/Shot_0012.png)

Today is a small update day it seems.

<!-- more -->

I have updated my Post To Tumblr extension again. I was getting a couple of requests for the ability to add a 'caption' to a post before the image is uploaded so I cranked out this little feature. You can enable it in the options.

Once enabled rather than immediately posting the image it will popup a new tab allowing you to add a caption or whatever to your post:

[![](/wp-content/uploads/2010/10/Shot_0022.png "Shot_002")](/wp-content/uploads/2010/10/Shot_0022.png)

Its not perfect, I would have preferred the pre formatting window to open in a div popup on the current page instead of a whole new tab, but for now this solution is simple and it works.

I must admit I borrowed the idea from another Tumblr posting extension called "Share on Tumblr". The code is ultra simple:

```

&lt;html&gt;
&lt;head&gt;
&lt;script&gt;

    // Thanks to share on tumblr extension for this
    chrome.tabs.getSelected(null, function(tab)
    {
    	var url = getParam(tab.url,"u")
    	//var url = encodeURIComponent(getParam(tab.url,"u"));
    	var finalurl="https://www.tumblr.com/share?v=3&amp;u="+url+"&amp;s=";
    	document.getElementById("container").src=finalurl;
    });

    // Thanks https://www.netlobo.com/url_query_string_javascript.html
    function getParam( url, name )
    {
      name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
      var regexS = "[\?&amp;]"+name+"=([^&amp;#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      if( results == null )
    	return "";
      else
    	return results[1];
    }

&lt;/script&gt;
&lt;link rel="stylesheet" href="main.css" type="text/css"/&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="header"&gt;
 &lt;h1&gt;Post To Tumblr&lt;/h1&gt;
&lt;/div&gt;
&lt;div class="section-header first"&gt;&lt;em&gt;Format your post below&lt;/em&gt;&lt;/div&gt;
&lt;br &gt;
&lt;iframe id="container" style="width:500px;height:430px;border:0px" src=""&gt;&lt;/iframe&gt;&lt;/body&gt;
&lt;/html&gt;

```

It just opens an iframe with the Tumblr Share page. Simples!

```

```
