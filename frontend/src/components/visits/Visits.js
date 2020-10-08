import React from "react";
import { AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import Match from "../common/matchGallery/GetMatches";

const Visits = ({ match, history }) => {
    const { page } = match.params;

    const tabNameToIndex = {
        0: "newvisits",
        1: "allvisits",
        2: "myvisits",
    };

    const indexToTabName = {
        newvisits: 0,
        allvisits: 1,
        myvisits: 2,
    };

    const [selectedTab, setValue] = React.useState(indexToTabName[page]);

    const handleChange = (event, newValue) => {
        history.push(`/visits/${tabNameToIndex[newValue]}`);
        setValue(newValue);
    };

    const tabs = ["New visits", "All visits", "My visits"];

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
