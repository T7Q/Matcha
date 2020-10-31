import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Button, Typography, List } from '@material-ui/core';

import profileService from '../../../services/profileService';
import { unblockUser } from '../../../actions/profile';
import { btnStyles } from '../../../styles/btnStyles';
import { componentStyles } from '../../../styles/componentStyles';
import BlockedUserCard from './BlockedUserCard';

const BlockedUsers = ({ setSnackbar }) => {
    const dispatch = useDispatch();
    const classes = btnStyles();
    const classesSetting = componentStyles();
    const [blockedList, setBlockedUsers] = useState([]);

    useEffect(() => {
        profileService.getBlockedUsers().then((res) => {
            setBlockedUsers(res);
        });
    }, []);

    const handleBlock = (index) => () => {
        const newblockedList = [...blockedList];
        newblockedList[index].blocked = !newblockedList[index].blocked;
        setBlockedUsers(newblockedList);
    };

    const handleSave = () => {
        const unblockList = blockedList.filter((e) => e.blocked === false);
        if (unblockList.length > 0) {
            dispatch(unblockUser('settings', unblockList));
            const newblockedList = blockedList.filter((e) => e.blocked === true);
            setBlockedUsers(newblockedList);
        } else {
            setSnackbar(true, 'warning', 'No changes applied');
        }
    };

    if (blockedList.length === 0) {
        return <Typography>No blocked accounts in this profile</Typography>;
    }

    return (
        <FormGroup>
            <List className={classesSetting.list}>
                {blockedList.map((value, index) => {
                    const labelId = `checkbox-list-secondary-label-${value.user_id}`;

                    return (
                        <BlockedUserCard
                            key={value.user_id}
                            labelId={labelId}
                            value={value}
                            handleBlock={handleBlock}
                            index={index}
                            blockedList={blockedList}
                        />
                    );
                })}
            </List>
            <Button className={classes.mainButton} onClick={handleSave}>
                Save
            </Button>
        </FormGroup>
    );
};

export default BlockedUsers;
