import React from "react";
import { AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import Match from "../common/matchGallery/GetMatches";

const Visits = ({ match, history }) => {
    const { page } = match.params;

    const indexToTabName = ["newvisits", "allvisits", "myvisits"];

    const [selectedTab, setValue] = React.useState(
        indexToTabName.indexOf(page)
    );

    const handleChange = (event, newValue) => {
        history.push(`/visits/${indexToTabName[newValue]}`);
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static">
                <Typography variant="h6">Visit History</Typography>
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab label="New visits" />
                    <Tab label="All visits" />
                    <Tab label="My visits" />
                </Tabs>
            </AppBar>
            {selectedTab === 0 && (
                <Match route="/match/visitedMe" filterIsOn={0} />
            )}
            {selectedTab === 1 && (
                <Match route="/match/visitedMe" filterIsOn={0} />
            )}
            {selectedTab === 2 && (
                <Match route="/match/visitedByMe" filterIsOn={0} />
            )}
        </div>
    );
};

export default Visits;
