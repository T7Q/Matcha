import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Link,
    Badge,
    Box,
} from '@material-ui/core';
import OnlineBadge from './OnlineBadge';

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

    useEffect(() => {
        let isMounted = true;
        socket.on('ONLINE', (userId, online) => {
            if (isMounted) {
                setPartnerIsOnline({ online: online, partnerId: userId });
            }
        });
        return () => {
            isMounted = false;
        };
    }, [partnerIsOnline, socket]);

    const amount = (amount) => {
        return amount < 100 ? amount : '99+';
    };
    return (
        <ListItem
            style={{
                borderBottom: '1px solid #252839',
                backgroundColor: active === conversation.partner_id ? '#10183c' : 'inherit',
            }}
            button
            alignItems="flex-start">
            <Link
                onClick={() => history.push(`/profile/${conversation.partner_id}`)}
                component="button">
                <ListItemAvatar>
                    <Avatar alt={conversation.partner_name} src={conversation.avatar} />
                </ListItemAvatar>
            </Link>
            <ListItemText
                style={{ color: active === conversation.partner_id ? '#ca416e' : '#219bf1' }}
                onClick={(e) => handleChange(e, conversation.partner_id, conversation.sender_id)}
                primary={
                    <>
                        {conversation.partner_name} {conversation.partner_surname}{' '}
                        <div style={{ float: 'right', color: '#b5bad3' }}>
                            {/* <OnlineBadge
                                lastSeen={
                                    partnerIsOnline.partnerId === conversation.partner_id &&
                                    partnerIsOnline.online
                                        ? 'online'
                                        : conversation.last_seen
                                }
                            /> */}
                        </div>
                    </>
                }
                secondary={
                    <Box component="span" display="block" textOverflow="ellipsis" overflow="hidden">
                        {partnerTyping.typing && partnerTyping.chatId === conversation.chat_id
                            ? 'is typing...'
                            : lastMessage.chatId === conversation.chat_id
                            ? lastMessage.text
                            : conversation.last_message}{' '}
                        {unread ? (
                            <Badge
                                badgeContent={amount(unread)}
                                color="primary"
                                style={{ float: 'right' }}></Badge>
                        ) : (
                            ''
                        )}
                    </Box>
                }
            />
        </ListItem>
    );
};

export default ConversationBox;
