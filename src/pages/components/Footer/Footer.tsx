import React from "react";
import scss from "./Footer.module.scss";
import { Paper, useTheme } from "@mui/material";
import Link from "next/link";
import styled from "@emotion/styled";

const Footer = () => {
  const theme = useTheme();

  const FooterLink = styled(Link)`
    color: ${theme.palette.text.primary};
  `;

  return (
    <footer className={scss.footer}>
      <Paper sx={{ width: "100%" }} color={"#262626"}>
        <ul role="menu">
          <li>
            <FooterLink href={"/"}>Home</FooterLink>
          </li>
          <li>
            <FooterLink href={"/dashboard/events"}>Events</FooterLink>
          </li>
        </ul>
      </Paper>
    </footer>
  );
};

export default Footer;