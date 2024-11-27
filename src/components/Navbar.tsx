import { AppBar, Button, Drawer, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";

import { Link } from "react-router-dom";
// src/components/Navbar.tsx
import MenuIcon from "@mui/icons-material/Menu";

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="sticky" color="primary">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Interest Sharing Platform
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Button color="primary">Home</Button>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/explore" style={{ textDecoration: "none" }}>
                            <Button color="primary">Explore</Button>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/profile" style={{ textDecoration: "none" }}>
                            <Button color="primary">Profile</Button>
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
