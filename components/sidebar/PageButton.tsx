import { Horizontal } from "gls/lib";
import * as React from "react";
import { style } from "typestyle";

interface Props {
  icon: React.ReactNode;
  label: string;
}

const styles = style({
  fontSize: "1em",
  opacity: 0.8,
  cursor: "pointer",
  $nest: {
    "&:hover": {
      opacity: 1,
    },
  },
});

export const PageButton: React.FC<Props> = ({ icon, label }) => {
  return (
    <Horizontal className={styles} verticalAlign="center" spacing={7}>
      {icon} <div>{label}</div>
    </Horizontal>
  );
};
