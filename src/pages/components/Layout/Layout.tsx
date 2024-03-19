import SideMenu from "@/pages/components/SideMenu"
import scss from "./Layout.module.scss";
import React from "react";
import Head from "next/head";
import Footer from "@/pages/components/Footer"

const Layout = (props: any) => {
  return (
    <>
      <Head>
        <title>Events Dashboard</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={scss.layout}
        style={{ padding: "0 24px 0 80px" }}
      >
        {<SideMenu />}
        {props.children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;