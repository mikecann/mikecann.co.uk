import { Horizontal, StretchSpacer } from "gls/lib";
import Link from "next/link";
import * as React from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { IconButton } from "../IconButton";
import { useScrollYPosition } from "react-use-scroll-position";
import { useScrollYWithDelta } from "../../utils/useScrollYWithDelta";
import { SearchModal } from "../searchModal/SearchModal";
import { useState } from "react";

interface Props {}

export const TopNavbar: React.FC<Props> = ({}) => {
  const [scrollY, scrollDelta] = useScrollYWithDelta();
  const [searchVisible, setSearchVisible] = useState(false);

  const shouldShow = scrollY == 0 || scrollDelta < 0;

  return (
    <>
      <Horizontal
        verticalAlign="center"
        style={{
          width: "100%",
          backgroundColor: "white",
          height: 60,
          position: "fixed",
          zIndex: 10,
          paddingLeft: 20,
          paddingRight: 20,
          fontSize: "1.5em",
          borderBottom: "2px solid #ffc7ad",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          opacity: shouldShow ? 1 : 0,
          transition: "all 0.3s linear",
          pointerEvents: shouldShow ? undefined : "none",
        }}
      >
        <Link href="/">
          <a>
            <IconButton>
              <FaHome />
            </IconButton>
          </a>
        </Link>

        <StretchSpacer />

        <div
          className="navbar-title"
          style={{ fontSize: "1.2rem", fontWeight: "bold", opacity: 0.5, color: "#333" }}
        >
          <Link href="/">mikecann.co.uk</Link>
        </div>

        <StretchSpacer />

        <IconButton onClick={() => setSearchVisible(true)}>
          <FaSearch />
        </IconButton>
      </Horizontal>

      {searchVisible && <SearchModal onClose={() => setSearchVisible(false)} />}
    </>
  );
};
