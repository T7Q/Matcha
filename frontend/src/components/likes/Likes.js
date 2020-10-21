import React from "react";
import { AppBar, Box, Tabs, Tab, Typography } from "@material-ui/core";
import Match from "../common/matchGallery/GetMatches";

const Likes = ({ match, history }) => {
    const { page } = match.params;

    const indexToTabName = ["likesyou", "connected", "temp"];

    const [selectedTab, setValue] = React.useState(
        indexToTabName.indexOf(page)
    );

    const handleChange = (event, newValue) => {
        history.push(`/likes/${indexToTabName[newValue]}`);
        setValue(newValue);
    };

    return (
        <Box minHeight="80vh" display="flex" flexDirection="column">
            <AppBar position="static">
                <Typography variant="h6">Likes</Typography>
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab label="Likes you" />
                    <Tab label="Connected" />
                </Tabs>
            </AppBar>
            {selectedTab === 0 && (
                <Match route="/match/likedme" filterIsOn={0} />
            )}
            {selectedTab === 1 && (
                <Match route="/match/connected" filterIsOn={0} />
            )}
        </Box>
    );
};

export default Likes;
