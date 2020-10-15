import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/chat';

const PrivateChat = ({ getMessages, currentConversation, chat: { messages } }) => {
    useEffect(() => {
        getMessages(currentConversation);
    }, [currentConversation]);

    return <div>Messages</div>;
};

PrivateChat.propTypes = {
    getMessages: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    chat: state.chat,
});

export default connect(mapStateToProps, { getMessages })(PrivateChat);
