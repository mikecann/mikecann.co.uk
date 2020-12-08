import * as React from "react";
import { SocialIcon } from "./SocialIcon";
import { AiOutlineGithub, AiOutlineTwitter, AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { RiStackOverflowLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

interface Props {}

export const SocialIcons: React.FC<Props> = ({}) => {
  return (
    <>
      <SocialIcon href="https://github.com/mikecann">
        <AiOutlineGithub />
      </SocialIcon>
      <SocialIcon href="https://stackoverflow.com/users/521097/mikeysee">
        <RiStackOverflowLine />
      </SocialIcon>
      <SocialIcon href="https://twitter.com/mikeysee">
        <AiOutlineTwitter />
      </SocialIcon>
      <SocialIcon href="https://facebook.com/mikeysee">
        <AiFillFacebook />
      </SocialIcon>
      <SocialIcon href="https://www.linkedin.com/in/mikecann/">
        <AiFillLinkedin />
      </SocialIcon>
      <SocialIcon href="mailto:mike.cann@gmail.com">
        <MdEmail />
      </SocialIcon>
    </>
  );
};
