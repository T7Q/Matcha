import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography, Link, Button, TextField } from '@material-ui/core';
import { getMessages } from '../../actions/chat';
import { Avatar } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Dropdown from '../common/Dropdown';
import { getProfile } from '../../actions/profile';
// import { useStyles } from '../../styles/custom';

const PrivateChat = ({
    getProfile,
    getMessages,
    currentConversation,
    chat: { messages, conversations },
    profile: { profile },
    auth: { user, socket },
    history,
    setCurrentConversation,
    partnerTyping,
}) => {
    const [textMessage, setTextMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    const chat = currentConversation
        ? conversations.filter(chat => chat.partner_username === currentConversation)[0]
        : false;
    const messageRef = useRef();
    const partnerId = chat ? chat.partner_id : 0;
    // const classes = useStyles();

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (partnerId !== 0) {
            getMessages(chat.chat_id);
            getProfile('otherUser', partnerId);
            socket.emit('JOIN_CHAT', chat.chat_id);
            socket.on('MESSAGE', chatId => {
                // console.log('on message in private chat');
                // console.log('chat id in private chat', chat.chat_id, chatId);
                if (chat.chat_id === chatId) {
                    getMessages(chatId);
                    // console.log('inside private chat go to see conversations');
                    socket.emit('SEE_CONVERSATION', user.userId, partnerId);
                }
            });
        }
        return () => {
            socket.off('MESSAGE');
            socket.emit('TYPING_NOTIFICATION', chat.chat_id, false, partnerId);
        };
    }, [currentConversation, getMessages, partnerId, getProfile, socket, chat, user.userId]);

    const goTo = newRoute => {
        history.push(newRoute);
    };

    const onChange = e => {
        let typing = e.target.value !== '' ? true : false;
        setTextMessage(e.target.value);
        socket.emit('TYPING_NOTIFICATION', chat.chat_id, typing, partnerId);
    };

    const postMessage = async e => {
        e.preventDefault();
        if (textMessage) {
            await axios.post('/chat/message', {
                senderId: user.userId,
                receiverId: partnerId,
                content: textMessage,
            });
            setTextMessage('');
            socket.emit('SEND_MESSAGE', chat.chat_id, partnerId);
            socket.emit('TYPING_NOTIFICATION', chat.chat_id, false, partnerId);
        }
    };

    if (currentConversation === 0 || !profile) {
        return <></>;
    }

    return (
        <Box
            position="relative"
            bgcolor="secondary.light"
            display="flex"
            flexDirection="column"
            p="5px"
            minWidth="100%">
            <Box borderBottom={1} display="flex" alignItems="center">
                <Box flexGrow={1} textAlign="center">
                    <Link
                        onClick={() => goTo(`/profile/${partnerId}`)}
                        component="button"
                        underline="none"
                        color="secondary">
                        <Avatar style={{ margin: 'auto' }} alt="N" src={profile.profile_pic_path} />
                        <Typography variant="h6">
                            {profile.first_name} {profile.last_name}
                        </Typography>
                    </Link>
                </Box>
                <Dropdown />
                <Button onClick={() => setCurrentConversation(0)}>
                    <HighlightOffIcon fontSize="large" />
                </Button>
            </Box>
            <Box ref={messageRef} mb={8} maxHeight="60vh" style={{ overflowY: 'auto' }}>
                {messages.length > 0 &&
                    messages.map(element => {
                        const options = { month: 'short', day: 'numeric' };
                        const date = new Date(element.time_sent).toLocaleDateString('en-US', options);
                        return (
                            <Box p={1} key={element.id} textAlign={element.mine ? 'right' : 'left'}>
                                <Box
                                    borderRadius={element.mine ? '14px 14px 0 14px' : '14px 14px 14px 0'}
                                    bgcolor={element.mine ? 'primary.light' : 'primary.main'}
                                    m={1}
                                    mr={element.mine ? 0 : 10}
                                    ml={element.mine ? 10 : 0}
                                    p={2}>
                                    <Typography>{element.message}</Typography>
                                </Box>
                                <Typography style={{ color: '#b5bad3' }}>{date}</Typography>
                            </Box>
                        );
                    })}
            </Box>
            <Box position="absolute" bottom={2} width="95%" m="5px">
                <form onSubmit={postMessage}>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <TextField
                                style={{ width: '100%' }}
                                variant="outlined"
                                type="text"
                                name="textMessage"
                                value={textMessage}
                                onChange={onChange}
                            />
                        </Box>
                        <Button variant="contained" color="primary" type="submit">
                            Send
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

PrivateChat.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getMessages: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    chat: state.chat,
    auth: state.auth,
});

export default connect(mapStateToProps, { getMessages, getProfile })(withRouter(PrivateChat));
