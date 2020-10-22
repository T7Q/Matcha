import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

const ConversationBox = ({ unread, conversation, isActive, handleChange }) => {
    return (
        <ListItem
            style={{ borderBottom: '1px solid #003781' }}
            button
            onClick={e => handleChange(e, conversation.partner_username, conversation.sender_id)}
            alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={conversation.partner_username} src={conversation.avatar} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <>
                        {conversation.partner_username}{' '}
                        <div style={{ float: 'right', color: '#b5bad3' }}>last seen</div>
                    </>
                }
                secondary={
                    <>
                        {conversation.last_message}{' '}
                        <span style={{ float: 'right', color: 'red', fontSize: '16px' }}>
                            {unread ? unread : ''}
                        </span>
                    </>
                }
            />
        </ListItem>
    );
};

export default ConversationBox;
