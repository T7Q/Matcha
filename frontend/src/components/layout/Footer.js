import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Typography, Box, useMediaQuery, Button } from "@material-ui/core";

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        !isMobile && (
            <Box
                zIndex="1"
                textAlign="center"
                p={2}
                bgcolor="secondary.main"
                color="text.secondary"
            >
                <Typography variant="body2">
                    {" "}
                    © Copyright 2020 All Rights Reserved.{" "}
                </Typography>
                <Button
                    href="https://github.com/T7Q"
                    style={{ color: theme.palette.text.secondary }}
                    size="small"
                >
                    Tkuumola
                </Button>{" "}
                &{" "}
                <Button
                    href="https://github.com/DianaMukaliyeva"
                    size="small"
                    style={{ color: theme.palette.text.secondary }}
                >
                    Dmukaliyeva
                </Button>
            </Box>
        )
    );
};

export default Footer;
