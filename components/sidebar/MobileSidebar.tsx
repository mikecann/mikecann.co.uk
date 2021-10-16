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
import { Background } from "./Background";
import Link from "next/link";

interface Props {}

export const MobileSidebar: React.FC<Props> = ({}) => {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <>
      <Background style={{ width: 60 }}>
        <Link href="/about">
          <img
            alt={`profile picture of me mike cann`}
            style={{
              borderRadius: "50%",
              animation: "float 6s ease-in-out infinite",
              cursor: "pointer",
            }}
            width={40}
            height={40}
            src="/images/me.jpg"
          />
        </Link>
        <VerticalSpacer space={30} />
        <Vertical spacing={20} style={{ fontSize: "1.5em" }}>
          <PageButton icon={<FaHome />} href="/" />
          <PageButton icon={<FaTags />} href="/tags" />
          <PageButton icon={<HiArchive />} href="/years" />
          <PageButton icon={<IoMdInformationCircle />} href="/about" />
          <PageButton icon={<FaRssSquare />} href="/rss.xml" />
          <PageButton icon={<IoMdSearch />} onClick={() => setSearchVisible(true)} />
        </Vertical>
      </Background>
      {searchVisible && <SearchModal onClose={() => setSearchVisible(false)} />}
    </>
  );
};
