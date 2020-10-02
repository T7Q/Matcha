import React from "react";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Profile from '../profile/Profile'
import Chat from '../chat/Chat'


const Likes = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { page } = params; 
    console.log("PROPS", props);
    console.log("MATCH", match);
    console.log("PAGE", page);

    const tabNameToIndex = {
        0: "recommend",
        1: "search"
    }

    const indexToTabName = {
        recommend: 0,
        search: 1
    }

    const [value, setValue] = React.useState(indexToTabName[page]);
    const handleChange = (event, newValue) => {
        history.push(`/likes/${tabNameToIndex[newValue]}`);
        setValue(newValue);
      };
    return (
        <div>
            <p>Likes</p>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange} 
                >
                    <Tab label="Recommended"  />
                    <Tab label="Search"  />
                    <Tab label="Item Three" />
                </Tabs>
            </AppBar>
            {value === 0 && <Profile />}
            {value === 1 && <Chat />}
        </div>
    );
};

export default Likes;
