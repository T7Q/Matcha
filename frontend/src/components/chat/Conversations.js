import React from 'react';
import { List } from '@material-ui/core';
import ConversationBox from './ConversationBox';

const Conversations = ({
    messageNotifications,
    conversations,
    handleChange,
    partnerTyping,
    lastMessage,
    socket,
    active,
}) => {
    const conversationItems = conversations.map((conversation) => {
        return (
            <ConversationBox
                socket={socket}
                partnerTyping={partnerTyping}
                key={conversation.chat_id}
                conversation={conversation}
                unread={messageNotifications[conversation.partner_id]}
                handleChange={handleChange}
                active={active}
                lastMessage={lastMessage}
            />
        );
    });

    // return <List style={{ backgroundColor: '#252839', minWidth: '80%' }}>{conversationItems}</List>;
    return <List style={{ minWidth: '80%' }}>{conversationItems}</List>;
};

export default Conversations;
