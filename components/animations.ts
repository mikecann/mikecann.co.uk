import { keyframes } from "typestyle";

export const floatAnimation = (size = 10) =>
  keyframes({
    "0%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: `translateY(-${size}px)`,
    },
  });
