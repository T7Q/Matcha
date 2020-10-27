import React from 'react';
import { List } from '@material-ui/core';
import ConversationBox from './ConversationBox';
import { chatStyles } from '../../styles/chatStyles';

const Conversations = ({
    messageNotifications,
    conversations,
    handleChange,
    partnerTyping,
    lastMessage,
    socket,
    active,
}) => {
    const classesChat = chatStyles();
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

    return <List
    className={classesChat.list}
    >{conversationItems}</List>;
};

export default Conversations;
