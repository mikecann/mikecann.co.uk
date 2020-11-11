import * as React from "react";
import { style } from "typestyle";

interface Props {}

const styles = style({
  fontSize: "1.4em",
  opacity: 0.8,
  cursor: "pointer",
  $nest: {
    "&:hover": {
      opacity: 1,
    },
  },
});

export const SocialIcon: React.FC<Props> = ({ children }) => {
  return <div className={styles}>{children}</div>;
};
