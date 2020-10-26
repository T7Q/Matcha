import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from '@material-ui/core';
import { FormGroup, Button, Typography } from '@material-ui/core';

import BlockedUserCard from './BlockedUserCard';
import { unblockUser } from '../../../actions/profile';
import { useStyles } from '../../../styles/custom';

const BlockedUsers = ({ unblockUser, setSnackbar }) => {
    const classes = useStyles();
    const [blockedList, setBlockedUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;
        async function getBlockedUsers() {
            const res = await axios.get('/profile/blockedUsers');
            isMounted && setBlockedUsers(res.data);
        }
        getBlockedUsers();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleBlock = (index) => () => {
        const newblockedList = [...blockedList];
        newblockedList[index].blocked = !newblockedList[index].blocked;
        setBlockedUsers(newblockedList);
    };
    const handleSave = () => {
        const unblockList = blockedList.filter((e) => e.blocked === false);
        if (unblockList.length > 0) {
            unblockUser('settings', unblockList);
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
            <List style={{ maxHeight: 350, overflow: 'auto', borderTop: '1px solid #252839' }}>
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
            <Button
                className={`${classes.customButton} ${classes.p2}`}
                size="small"
                onClick={handleSave}>
                Save
            </Button>
        </FormGroup>
    );
};

BlockedUsers.propTypes = {
    unblockUser: PropTypes.func.isRequired,
};

export default connect(null, { unblockUser })(BlockedUsers);
