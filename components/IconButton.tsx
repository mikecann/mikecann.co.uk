import * as React from "react";
import { style } from "typestyle";

interface Props
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const styles = style({
  padding: 5,
  color: "#666",
  cursor: "pointer",
  transition: "all 0.15s ease",
  $nest: {
    "&:hover": {
      color: "#f1773c",
    },
  },
});

export const IconButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <div className={styles} {...rest}>
      {children}
    </div>
  );
};
