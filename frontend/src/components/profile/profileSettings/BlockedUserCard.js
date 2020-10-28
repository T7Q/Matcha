import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemSecondaryAction } from '@material-ui/core';
import { ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

import ToggleIcon from 'material-ui-toggle-icon';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const BlockedUserCard = ({ value, handleBlock, index, blockedList, labelId }) => {
    return (
        <>
            <ListItem
                button
                component={Link}
                to={`/profile/${value.user_id}`}
                style={{ borderBottom: '1px solid #252839' }}>
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
                            onIcon={<RemoveCircleOutlineIcon color="primary" />}
                            offIcon={<CheckCircleIcon />}
                        />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

export default BlockedUserCard;
