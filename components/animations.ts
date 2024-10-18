import { keyframes } from "typestyle";

export const floatAnimation = keyframes({
  "0%": {
    transform: "translateY(0px)",
  },
  "50%": {
    transform: "translateY(-10px)",
  },
});

/*
@keyframes float {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-10px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
}
*/