import React, { ReactNode } from "react";
import Head from "next/head";
import { mediaStyles } from "../../utils/media";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div style={{ width: "100%", height: "100%" }}>
    <Head>     
      <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
    </Head>   
    {children}
  </div>
);

export default Layout;
