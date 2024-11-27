import { Container, Typography } from "@mui/material";

import React from "react";

const ExplorePage: React.FC = () => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Welcome to the Interest Sharing Platform - ExplorePage
            </Typography>
            <Typography variant="body1">
                Share, discover, and connect over your interests!
            </Typography>
        </Container>
    );
};

export default ExplorePage;
