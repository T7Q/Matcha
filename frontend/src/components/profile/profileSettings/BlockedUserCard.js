import React from 'react';
import { Link } from 'react-router-dom';
import ToggleIcon from 'material-ui-toggle-icon';

import { ListItem, ListItemSecondaryAction } from '@material-ui/core';
import { ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { RemoveCircleOutline, CheckCircle } from '@material-ui/icons/';

import { systemStyles } from '../../../styles/systemStyles';

const BlockedUserCard = ({ value, handleBlock, index, blockedList, labelId }) => {
    const classes = systemStyles();

    return (
        <ListItem
            button
            component={Link}
            to={`/profile/${value.user_id}`}
            className={classes.borderBottom}>
            <ListItemAvatar>
                <Avatar
                    alt={`Avatar n°${value.profile_pic_path + 1}`}
                    src={`${value.profile_pic_path}`}
                />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`${value.first_name}, ${value.age}`} />
            <ListItemSecondaryAction>
                <IconButton onClick={handleBlock(index)} style={{ padding: 0 }}>
                    <ToggleIcon
                        on={blockedList[index].blocked}
                        onIcon={<RemoveCircleOutline color="primary" />}
                        offIcon={<CheckCircle />}
                    />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default BlockedUserCard;
