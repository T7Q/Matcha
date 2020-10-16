import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';

const Messages = ({ messages }) => {
    let messageItems = [];
    if (messages && messages.length > 0) {
        messageItems = messages.map((message, index) => {
            const imageThumbnail = message.mine ? null : <Avatar src={message.imageUrl} alt="N" />;
            return (
                <div key={message.id}>
                    {imageThumbnail}
                    <div>{message.message}</div>
                    <div>{message.time_sent}</div>
                </div>
            );
        });
    }

    return <>{messageItems}</>;
};

export default Messages;
