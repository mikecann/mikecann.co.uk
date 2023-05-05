import Link from "next/link";
import * as React from "react";
import { style } from "typestyle";

interface Props {
  href: string;
  children?: React.ReactElement;
}

const styles = style({
  fontSize: "1.4em",
  opacity: 0.8,
  cursor: "pointer",
  color: "white",
  $nest: {
    "&:hover": {
      opacity: 1,
      color: "white",
    },
  },
});

export const SocialIcon: React.FC<Props> = ({ children, href }) => {
  return (
    <Link target="_blank" className={styles} href={href}>
      {children}
    </Link>
  );
};
