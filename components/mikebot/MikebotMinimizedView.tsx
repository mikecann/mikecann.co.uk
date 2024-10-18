import { Grid, Vertical } from "gls/lib";
import * as React from "react";
import { format } from "date-fns";
import { style } from "typestyle";
import Link from "next/link";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { floatAnimation } from "../animations";
import { PiChatCircleTextDuotone } from "react-icons/pi";
import { AvatarSpeechBubble } from "./AvatarSpeechBubble";

interface Props {
  onOpen: () => void;
}

const cardStyle = style({
  position: "fixed",
  right: "10px",
  bottom: "10px",
  animation: `${floatAnimation()} 6s ease-in-out infinite`,
  cursor: "pointer",
  zIndex: 1,
  pointerEvents: "initial",
});

export const MikebotMinimizedView: React.FC<Props> = ({ onOpen }) => {
  return (
    <Vertical className={cardStyle} onClick={onOpen}>
      <img
        alt={`profile picture of me mike cann`}
        style={{
          borderRadius: "50%",
          boxShadow: "0 5px 15px 0px rgba(0, 0, 0, 0.6)",
        }}
        width={60}
        height={60}
        src="/images/me.jpg"
      />
      <AvatarSpeechBubble />
    </Vertical>
  );
};
