import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Link, Badge, Box } from '@material-ui/core';
import { ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
// import OnlineBadge from './OnlineBadge';
import { chatStyles } from '../../styles/chatStyles';

const ConversationBox = ({
    unread,
    conversation,
    active,
    handleChange,
    partnerTyping,
    lastMessage,
    socket,
}) => {
    const [partnerIsOnline, setPartnerIsOnline] = useState({ online: false, partnerId: 0 });
    const history = useHistory();
    const classes = chatStyles();

    useEffect(() => {
        let isMounted = true;
        socket.on('ONLINE', (userId, online) => {
            if (isMounted) setPartnerIsOnline({ online: online, partnerId: userId });
        });

        return () => {
            isMounted = false;
        };
    }, [partnerIsOnline, socket]);

    const handleClick = () => {
        history.push(`/profile/${conversation.partner_id}`);
    };
    /* <OnlineBadge
                                lastSeen={
                                    partnerIsOnline.partnerId === conversation.partner_id &&
                                    partnerIsOnline.online
                                        ? 'online'
                                        : conversation.last_seen
                                }
                            /> */

    return (
        <ListItem
            className={
                active === conversation.partner_id
                    ? classes.conversationActiveList
                    : classes.conversationList
            }
            button>
            <Link onClick={handleClick} component="button">
                <ListItemAvatar>
                    <Avatar alt={conversation.partner_name} src={conversation.avatar} />
                </ListItemAvatar>
            </Link>
            <ListItemText
                className={active === conversation.partner_id ? classes.active : classes.nonActive}
                onClick={(e) => handleChange(e, conversation.partner_id, conversation.sender_id)}
                primary={
                    <span>
                        {conversation.partner_name} {conversation.partner_surname}
                    </span>
                }
                secondary={
                    <Box component="span" display="flex">
                        <Box
                            flexGrow={1}
                            component="span"
                            display="block"
                            textOverflow="ellipsis"
                            overflow="hidden">
                            {partnerTyping.typing && partnerTyping.chatId === conversation.chat_id
                                ? 'is typing...'
                                : lastMessage.chatId === conversation.chat_id
                                ? lastMessage.text
                                : conversation.last_message}{' '}
                        </Box>
                        {unread !== 0 && (
                            <Badge
                                badgeContent={unread}
                                max={99}
                                color="primary"
                                className={classes.floatRight}
                            />
                        )}
                    </Box>
                }
            />
        </ListItem>
    );
};

export default ConversationBox;
