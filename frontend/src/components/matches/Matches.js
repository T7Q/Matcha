import React from "react";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Profile from '../profile/Profile'
// import Chat from '../chat/Chat'
import Match from '../common/matchGallery/GetMatches'
import Typography from '@material-ui/core/Typography';


const Matches = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { page } = params; 

    console.log("FROM MATCHESNAV");
    const tabNameToIndex = {
        0: "recommended",
        1: "search"
    }

    const indexToTabName = {
        recommended: 0,
        search: 1
    }

    const [selectedTab, setValue] = React.useState(indexToTabName[page]);

    const handleChange = (event, newValue) => {
        console.log("new value", newValue);
        history.push(`/matches/${tabNameToIndex[newValue]}`);
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static">
                <Typography variant="h6">Matches</Typography>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange} 
                >
                    <Tab label="Recommended"  />
                    <Tab label="Search"  />
                </Tabs>
            </AppBar>
            {selectedTab === 0 && <Match route="/match/recommend"/>}
            {selectedTab === 1 && <Match route="/match/recommend"/>}
        </div>
    );
};

export default Matches;
