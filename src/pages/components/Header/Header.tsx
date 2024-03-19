import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import ThemeToggleButton from "@/pages/components/ThemeToggleButton"
import scss from "./Header.module.scss";

export type HeaderProps = {
    ColorModeContext: React.Context<{ toggleColorMode: () => void; }>,
}
const Header = (props: HeaderProps) => {
    const {ColorModeContext} = props;

    return (
         <AppBar position="static" sx={{ marginBottom: "40px" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters> 
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                        }}
                    >
                    Your Logo here..
                    </Typography>
                    <div className={scss.headerToggle}>
                        <ThemeToggleButton ColorModeContext={ColorModeContext}/>
                   </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;