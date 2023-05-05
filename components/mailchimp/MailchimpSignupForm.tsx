import * as React from "react";

interface Props {}

export function MailchimpSignupForm() {
  const [email, setEmail] = React.useState("");
  return (
    <div>
      <form
        action="https://epicshrimp.us3.list-manage.com/subscribe/post?u=aaed03be8d4e6cc7ca902a572&amp;id=3c8f7e6e85"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
      >
        <div style={{ display: "flex", marginBottom: 20 }}>
          <input
            style={{ width: "100%", marginRight: 10 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            name="EMAIL"
          />
          <input type="submit" value="Subscribe" name="subscribe" />
        </div>
      </form>
    </div>
  );
}
