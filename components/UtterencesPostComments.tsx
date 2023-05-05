import * as React from "react";
import Script from "next/script";
import useScript from "../utils/useScript";

interface Props {}

export const UtterencesPostComments: React.FC<Props> = ({}) => {
  const comment = React.useRef(null);

  const status = useScript({
    url: "https://utteranc.es/client.js",
    theme: "github-light",
    issueTerm: "og:title",
    label: "💬 comments",
    repo: "mikecann/mikecann.co.uk",
    ref: comment,
  });

  console.log(`utterences status`, status);

  return <div ref={comment}></div>;
};
