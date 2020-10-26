import React from 'react';
import { List } from '@material-ui/core';
import ConversationBox from './ConversationBox';

const Conversations = ({
    messageNotifications,
    conversations,
    currentConversation,
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

    return (
        <List style={{ backgroundColor: 'rgb(52, 55, 77)', minWidth: '80%' }}>
            {conversationItems}
        </List>
    );
};

export default Conversations;
