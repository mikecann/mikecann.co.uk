import * as React from "react"
import { style } from "typestyle"
import * as css from "csstips"


interface Props {}

export function MailchimpSignupPopup() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<script type="text/javascript" src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script><script type="text/javascript">window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us3.list-manage.com","uuid":"aaed03be8d4e6cc7ca902a572","lid":"3c8f7e6e85","uniqueMethods":true}) })</script>`,
      }}
    />
  )
}
