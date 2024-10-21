import { Grid, Vertical } from "gls/lib";
import * as React from "react";
import { style } from "typestyle";
import { floatAnimation } from "../animations";
import { AvatarSpeechBubble } from "./AvatarSpeechBubble";
import { useScrollYWithDelta } from "../../utils/useScrollYWithDelta";

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
  const [scrollY, scrollDelta] = useScrollYWithDelta();
  const isPostsPage = window.location.pathname.includes("/posts");
  
  const isNearBottom = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY + windowHeight;
    return documentHeight - scrollPosition <= 500;
  }, [scrollY]);

  const shouldShow = isPostsPage
    ? scrollY === 0 || scrollDelta < 0 || isNearBottom
    : true;

  return (
    <Vertical
      className={cardStyle}
      onClick={onOpen}
      style={{
        opacity: shouldShow ? 1 : 0,
        transition: "all 0.3s linear",
        pointerEvents: shouldShow ? undefined : "none",
      }}
    >
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
