import React from 'react';
import { AppBar, Tabs, Tab, Typography, Box, Container } from '@material-ui/core';
import Match from '../common/matchGallery/GetMatches';

const Likes = ({ match, history }) => {
    const { page } = match.params;

    const indexToTabName = ['likesyou', 'connected', 'temp'];

    const [selectedTab, setValue] = React.useState(indexToTabName.indexOf(page));

    const handleChange = (event, newValue) => {
        history.push(`/likes/${indexToTabName[newValue]}`);
        setValue(newValue);
    };

    return (
        <div>
            <AppBar color="secondary" position="static">
                <Box p={2} justifyContent="center">
                    <Typography variant="h6">Likes</Typography>
                </Box>
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab label="Likes you" />
                    <Tab label="Connected" />
                </Tabs>
            </AppBar>
            <Container>
                {selectedTab === 0 && (
                    <Box p={3}>
                        <Match route="/match/likedme" filterIsOn={0} />
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box p={3}>
                        <Match route="/match/connected" filterIsOn={0} />
                    </Box>
                )}
            </Container>
        </div>
    );
};

export default Likes;
