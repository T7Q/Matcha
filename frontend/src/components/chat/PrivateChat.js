import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { getMessages } from '../../actions/chat';
import Messages from './Messages';
import { Avatar } from '@material-ui/core';

const PrivateChat = ({ getMessages, currentConversation, chat: { messages } }) => {
    const [textMessage, setTextMessage] = useState('');

    useEffect(() => {
        getMessages(currentConversation);
    }, [currentConversation]);

    const isMessageEmpty = () => {
        return textMessage.trim().length === 0;
    };

    const disableButton = isMessageEmpty(textMessage);

    return (
        <>
            {messages && messages.length > 0 ? (
                <Box bgcolor="secondary.light" display="flex" flexDirection="column" p="5px" minWidth="100%">
                    {messages.map((message, index) => {
                        const imageThumbnail = message.mine ? null : <Avatar src={message.imageUrl} alt="N" />;
                        return (
                            <div key={message.id}>
                                {imageThumbnail}
                                <div>{message.message}</div>
                                <div>{message.time_sent}</div>
                            </div>
                        );
                    })}
                    <form>
                        <input
                            type="text"
                            placeholder="type a message"
                            value={textMessage}
                            onChange={e => {
                                setTextMessage(e.target.value);
                            }}
                        />
                        <button type="submit" disabled={disableButton}>
                            Send
                        </button>
                    </form>
                </Box>
            ) : (
                <></>
            )}
        </>
    );
};

PrivateChat.propTypes = {
    getMessages: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    chat: state.chat,
});

export default connect(mapStateToProps, { getMessages })(PrivateChat);
