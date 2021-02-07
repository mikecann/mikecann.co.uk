import * as React from "react";
import { Grid, Horizontal, Vertical, VerticalSpacer } from "gls/lib";
import { SocialIcon } from "./SocialIcon";
import { AiOutlineGithub, AiOutlineTwitter, AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { RiStackOverflowLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { PageButton } from "./PageButton";
import { FaHome, FaTags, FaRssSquare } from "react-icons/fa";
import { HiArchive } from "react-icons/hi";
import { IoMdSearch, IoMdInformationCircle } from "react-icons/io";
import { SearchModal } from "../searchModal/SearchModal";
import { useState } from "react";
import { Background } from "./Background";
import { SocialIcons } from "./SocialIcons";

interface Props {}

export const TabletSidebar: React.FC<Props> = ({}) => {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <>
      <Background style={{ width: 200 }}>
        <img
          alt={`profile picture of me mike cann`}
          style={{ borderRadius: "50%", animation: "float 6s ease-in-out infinite" }}
          width={120}
          height={120}
          src="/images/me.jpg"
        />
        <VerticalSpacer space={20} />
        <div style={{ fontSize: "1.8em", fontWeight: "bold" }}>Mike Cann</div>
        <VerticalSpacer space={30} />
        <Grid style={{ padding: 10 }} justify="center" spacing={[10, 10]}>
          <SocialIcons />
        </Grid>
        <VerticalSpacer space={30} />
        <Vertical width="100%" horizontalAlign="center" spacing={20}>
          <PageButton icon={<FaHome />} label="Home" href="/" />
          <PageButton icon={<FaTags />} label="Tags" href="/tags" />
          <PageButton icon={<HiArchive />} label="Archive" href="/years" />
          <PageButton icon={<IoMdInformationCircle />} label="About" href="/about" />
          <PageButton icon={<FaRssSquare />} label="RSS" href="/rss.xml" />
          <PageButton icon={<IoMdSearch />} label="Search" onClick={() => setSearchVisible(true)} />
        </Vertical>
      </Background>
      {searchVisible && <SearchModal onClose={() => setSearchVisible(false)} />}
    </>
  );
};
