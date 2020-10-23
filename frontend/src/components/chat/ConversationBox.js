import React, { useEffect, useState } from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

const ConversationBox = ({ unread, conversation, isActive, handleChange, partnerTyping, lastMessage, socket }) => {
    const [partnerIsOnline, setPartnerIsOnline] = useState({ online: false, partnerId: 0 });

    // console.log('lastMessage', lastMessage);
    useEffect(() => {
        let isMounted = true;
        socket.on('ONLINE', (userId, online) => {
            // console.log('in box on online', userId, online);
            if (isMounted) {
                setPartnerIsOnline({ online: online, partnerId: userId });
            }
        });
        return () => {
            isMounted = false;
        };
    }, [partnerIsOnline, socket]);

    // calculate hours ago
    const hours = date => {
        const timeNow = new Date();
        let differenceInTime = timeNow.getTime() - date.getTime();
        let differenceInMinutes = parseInt(differenceInTime / (1000 * 60));
        const str =
            differenceInMinutes >= 60
                ? 'more than an hour ago'
                : differenceInTime <= 1000 * 60
                ? 'less than a minute ago'
                : `${differenceInMinutes} minutes ago`;
        return str;
    };

    // calcuate number of days until now
    const days = lastSeen => {
        const today = new Date();
        const date = new Date(lastSeen);
        let differenceInTime = today.getTime() - date.getTime();
        let differenceInDays = parseInt(differenceInTime / (1000 * 3600 * 24));
        const str =
            differenceInDays > 365
                ? 'more than a year ago'
                : differenceInDays > 365
                ? '6 months ago'
                : differenceInDays > 91
                ? '3 months ago'
                : differenceInDays > 31
                ? 'a months ago'
                : differenceInDays === 0
                ? hours(date)
                : differenceInDays === 1
                ? 'yesterday'
                : `a ${differenceInDays} day(s) ago`;
        return str;
    };
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
                        <div style={{ float: 'right', color: '#b5bad3' }}>
                            {partnerIsOnline.partnerId === conversation.partner_id && partnerIsOnline.online
                                ? 'online'
                                : days(conversation.last_seen)}
                        </div>
                    </>
                }
                secondary={
                    <>
                        {partnerTyping.typing && partnerTyping.chatId === conversation.chat_id
                            ? 'is typing'
                            : lastMessage.chatId === conversation.chat_id
                            ? lastMessage.text
                            : conversation.last_message}{' '}
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
