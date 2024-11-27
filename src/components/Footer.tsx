import { Box, Typography } from "@mui/material";

import React from "react";

const Footer: React.FC = () => {
    return (
        <Box sx={{ backgroundColor: "#6200ea", padding: "20px", textAlign: "center" }}>
            <Typography variant="body1" color="white">
                &copy; 2024 Interest Sharing Platform
            </Typography>
        </Box>
    );
};

export default Footer;
