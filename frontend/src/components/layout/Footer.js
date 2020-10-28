import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Typography, Box, useMediaQuery, Button } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import { footerStyles } from "../../styles/footerStyles";

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const classesFooter = footerStyles();

    const authors = [
        {
            name: "tkuumola",
            github: "https://github.com/T7Q",
        },
        {
            name: "Dmukaliyeva",
            github: "https://github.com/DianaMukaliyeva",
        },
    ];

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
                {authors.map((value, index) => {
                    return (
                        <span key={index}>
                            <Tooltip title="Open GitHub" placement="top">
                                <Button
                                    target="_blank"
                                    href={value.github}
                                    className={classesFooter.footerBtn}
                                    size="small"
                                >
                                    {value.name}
                                </Button>
                            </Tooltip>
                            {index === 0 ? " & " : ""}
                        </span>
                    );
                })}
            </Box>
        )
    );
};

export default Footer;
