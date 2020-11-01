import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link, Badge, Box } from '@material-ui/core';
import { ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import OnlineBadge from './OnlineBadge';
import { systemStyles } from '../../styles/systemStyles';

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
    const classes = systemStyles();
    const { partner_id } = conversation;

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
        history.push(`/profile/${partner_id}`);
    };

    const isOnline = (time) => {
        const dateNow = new Date();
        const lastSeen = new Date(time);
        if (dateNow - lastSeen < 1000 * 60 * 3) {
            return true;
        }
        if (partnerIsOnline.partnerId === partner_id && partnerIsOnline.online) {
            return true;
        }
        return false;
    };

    return (
        <ListItem
            style={{ minHeight: '80px' }}
            className={`${classes.borderBottom} ${classes.pl0} ${
                active === partner_id ? classes.bgSome : ''
            }`}
            button>
            <Link onClick={handleClick} component="button">
                <ListItemAvatar>
                    <OnlineBadge online={isOnline(conversation.last_seen)} profile={conversation} />
                </ListItemAvatar>
            </Link>
            <ListItemText
                style={{ paddingLeft: '15px' }}
                className={active === partner_id ? classes.mainClr : classes.infoColor}
                onClick={(e) => handleChange(e, partner_id, conversation.sender_id)}
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
