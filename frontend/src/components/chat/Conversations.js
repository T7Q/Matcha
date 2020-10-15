import React, { useState } from 'react';
import { List } from '@material-ui/core';
import ConversationBox from './ConversationBox';

const Conversations = ({ conversations, currentConversation }) => {
    const conversationItems = conversations.map(conversation => {
        const conversationIsActive = currentConversation && conversation.chat_id === currentConversation.id;

        return (
            <ConversationBox
                key={conversation.chat_id}
                conversation={conversation}
                isActive={conversationIsActive}
            />
        );
    });

    return <List>{conversationItems}</List>;
};

export default Conversations;
{
    /* <div id="sidepanel">
    <div id="contacts">
        <ul>
            {selected &&
                conversations.map(item => (
                    <li
                        onClick={() => handleSelectConversation(item.id)}
                        key={item.id}
                        className={selected.id === item.id ? 'contact active' : 'contact'}>
                        <div className="wrap">
                            <span
                                className={
                                    item.isOnline === 1 ? 'contact-status online' : 'contact-status offline'
                                }></span>
                            <img src={`http://localhost:5000/images/${item.path}`} alt={item.lastname} />
                            <div className="meta">
                                <p className="name">
                                    {item.firstname} {item.lastname}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
        </ul>
    </div>
</div>; */
}
