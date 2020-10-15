import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/chat';
import Messages from './Messages';

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
            <Messages messages={messages} />
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
