import * as React from "react";
import { Grid, Horizontal, Vertical, VerticalSpacer } from "gls/lib";
import { SocialIcon } from "./SocialIcon";
import { AiOutlineGithub, AiOutlineTwitter, AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { RiStackOverflowLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { PageButton } from "./PageButton";
import { FaHome, FaTags, FaRssSquare } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";
import { HiArchive } from "react-icons/hi";
import { IoMdSearch, IoMdInformationCircle } from "react-icons/io";
import { SearchModal } from "../searchModal/SearchModal";
import { useState } from "react";

interface Props {}

export const Sidebar: React.FC<Props> = ({}) => {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <>
      <Vertical
        horizontalAlign="center"
        verticalAlign="center"
        style={{
          width: 400,
          height: "100%",
          position: "fixed",
          backgroundImage: "url(/images/sidebar-bg.jpg)",
          color: "#ebebeb",
          textAlign: "center",
          padding: 20,
        }}
      >
        <img
          style={{ borderRadius: "50%", animation: "float 6s ease-in-out infinite" }}
          width={125}
          height={125}
          src="/images/me.jpg"
        />
        <VerticalSpacer space={20} />
        <div style={{ fontSize: "1.8em", fontWeight: "bold" }}>Mike Cann</div>
        <VerticalSpacer space={30} />
        <div>A professional software developer that just cant stop tinkering with things</div>
        <VerticalSpacer space={30} />
        <Horizontal spacing={10}>
          <SocialIcon>
            <AiOutlineGithub />
          </SocialIcon>
          <SocialIcon>
            <RiStackOverflowLine />
          </SocialIcon>
          <SocialIcon>
            <AiOutlineTwitter />
          </SocialIcon>
          <SocialIcon>
            <AiFillFacebook />
          </SocialIcon>
          <SocialIcon>
            <AiFillLinkedin />
          </SocialIcon>
          <SocialIcon>
            <MdEmail />
          </SocialIcon>
        </Horizontal>
        <VerticalSpacer space={30} />
        <Grid width={300} justify="center" cols={2} colSpan={2} spacing={[30, 40]}>
          <PageButton icon={<FaHome />} label="Home" href="/" />

          <PageButton icon={<FaTags />} label="Tags" href="/tags" />
          <PageButton icon={<HiArchive />} label="Archive" href="/years" />

          <PageButton icon={<IoMdInformationCircle />} label="About" href="/about" />
          <PageButton icon={<FaRssSquare />} label="RSS" href="/rss.xml" />

          <PageButton icon={<IoMdSearch />} label="Search" onClick={() => setSearchVisible(true)} />
        </Grid>
      </Vertical>
      {searchVisible && <SearchModal onClose={() => setSearchVisible(false)} />}
    </>
  );
};
