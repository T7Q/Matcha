import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
// import { useStyles } from '../../../styles/custom';

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";

import ToggleIcon from "material-ui-toggle-icon";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const BlockedUsers = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit blocked users");
    };
    const [blockedList, setBlockedUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;
        async function getBlockedUsers() {
            const res = await axios.get('profile/blockedUsers');
            isMounted && setBlockedUsers(res.data);
        }
        getBlockedUsers();
        return () => {
            isMounted = false;
        };
    }, []);

    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);
    const [state, setState] = React.useState({ on: false});
    // const [state, setState] = React.useState([]);



    const handleToggle = (value, index) => () => {
        // console.log("handleToggle", index, value);
        // console.log("list before",  blockedList);
        blockedList[index].blocked = 0;
        // console.log("list after",  blockedList);
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
            blockedList[index].blocked = 0;
            // console.log(currentIndex);
        } else {
            newChecked.splice(currentIndex, 1);
            blockedList[index].blocked = 1;
            // console.log(currentIndex);
        }

        setChecked(newChecked);
    };
    const handMainClick = () => {
        console.log("main click");
    }
    const hanldeBlock = (index) => () => {
        const newblockedList = [...blockedList];
        newblockedList[index].blocked = !newblockedList[index].blocked;
        setBlockedUsers(newblockedList);
    };
    console.log("list", blockedList);

    return (
        // <form onSubmit={handleSubmit}>
        //     <div>some users here</div>

        // </form>
        <List dense className={classes.root} style={{backgroundColor: "grey"}}>
            {/* {[0, 1, 2, 3].map((value) => { */}
            {blockedList.map((value, index) => {
                const labelId = `checkbox-list-secondary-label-${value.user_id}`;
                return (
                    <ListItem key={value.user_id} button component={Link} to={`/profile/${value.user_id}`}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${value.profile_pic_path + 1}`}
                                src={`/${value.profile_pic_path}`}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            id={labelId}
                            primary={`${value.blocked}, ${value.first_name}, ${value.age}, ${value.user_id}`}
                        />
                        <ListItemSecondaryAction >
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(value, index)}
                                checked={checked.indexOf(value) !== 1}
                                // checked={checked.indexOf(value) !== -1}
                                inputProps={{ "aria-labelledby": labelId }}
                            />
                            <IconButton
                                onClick={hanldeBlock(index)}
                            >
                                <ToggleIcon
                                    // on={blockedList[index].blocked}
                                    on={blockedList[index].blocked}
                                    onIcon={<Visibility style={{fill: "blue"}} />}
                                    offIcon={<VisibilityOff style={{fill: "blue"}}/>}
                                />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default BlockedUsers;
