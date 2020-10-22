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
}) => {
    const conversationItems = conversations.map(conversation => {
        const conversationIsActive = currentConversation && conversation.chat_id === currentConversation.id;

        return (
            <ConversationBox
                partnerTyping={partnerTyping}
                key={conversation.chat_id}
                conversation={conversation}
                unread={messageNotifications[conversation.partner_id]}
                handleChange={handleChange}
                isActive={conversationIsActive}
                lastMessage={lastMessage}
            />
        );
    });

    return <List style={{ backgroundColor: 'rgb(52, 55, 77)', minWidth: '80%' }}>{conversationItems}</List>;
};

export default Conversations;
