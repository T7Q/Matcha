import React, { useState } from 'react';
import { List } from '@material-ui/core';
import ConversationBox from './ConversationBox';

const Conversations = ({ conversations, currentConversation, onClick }) => {
    const conversationItems = conversations.map(conversation => {
        const conversationIsActive = currentConversation && conversation.chat_id === currentConversation.id;

        return (
            <ConversationBox
                key={conversation.chat_id}
                conversation={conversation}
                onClick={onClick}
                isActive={conversationIsActive}
            />
        );
    });

    return <List style={{ backgroundColor: 'rgb(52, 55, 77)', minWidth: '80%' }}>{conversationItems}</List>;
};

export default Conversations;
