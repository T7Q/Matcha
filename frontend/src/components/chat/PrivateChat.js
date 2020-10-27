import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography, Link, Button, TextField, Icon, IconButton } from '@material-ui/core';
import { getMessages } from '../../actions/chat';
import { Send } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import HighlightOffOutlined from '@material-ui/icons/HighlightOff';
import Dropdown from '../profile/viewProfile/DropdownItem';
import { getProfile } from '../../actions/profile';
import { chatStyles } from '../../styles/chatStyles';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from '../../styles/custom';

const PrivateChat = ({
    getProfile,
    getMessages,
    currentConversation,
    chat: { messages, conversations },
    profile: { profile },
    auth: { user, socket },
    history,
    handleChange,
}) => {
    const theme = useTheme();
    const classes = useStyles();
    const classesChat = chatStyles();
    const [textMessage, setTextMessage] = useState('');
    const chat = currentConversation
        ? conversations.filter((chat) => chat.partner_username === currentConversation)[0]
        : false;
    const messageRef = useRef();
    const partnerId = chat ? chat.partner_id : 0;

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        let isMounted = true;
        if (partnerId !== 0) {
            getMessages(chat.chat_id);
            getProfile('otherUser', partnerId, false);
            socket.emit('JOIN_CHAT', chat.chat_id);
            socket.on('MESSAGE', (chatId) => {
                if (isMounted && chat.chat_id === chatId) {
                    getMessages(chatId);
                    socket.emit('SEE_CONVERSATION', user.userId, partnerId);
                }
            });
        }
        return () => {
            isMounted = false;
            socket.off('MESSAGE');
            socket.emit('TYPING_NOTIFICATION', chat.chat_id, false, partnerId);
        };
    }, [currentConversation, getMessages, partnerId, getProfile, socket, chat, user.userId]);

    const goTo = (newRoute) => {
        history.push(newRoute);
    };

    const onChange = (e) => {
        let typing = e.target.value !== '' ? true : false;
        setTextMessage(e.target.value);
        socket.emit('TYPING_NOTIFICATION', chat.chat_id, typing, partnerId);
    };

    const postMessage = async (e) => {
        e.preventDefault();
        if (textMessage) {
            await axios.post('/chat/message', {
                senderId: user.userId,
                receiverId: partnerId,
                content: textMessage,
            });
            socket.emit('SEND_MESSAGE', chat.chat_id, partnerId, textMessage);
            socket.emit('TYPING_NOTIFICATION', chat.chat_id, false, partnerId);
            setTextMessage('');
        }
    };

    if (currentConversation === 0 || !profile) {
        return <></>;
    }

    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="column"
            // p="5px"
            pl={0}
            pr={0}
            minWidth="100%"
            className={classesChat.chat}>
            <Box display="flex" alignItems="center" style={{ borderBottom: '1px solid #252839' }}>
                <Box flexGrow={1} textAlign="center" flexDirection="row">
                    <Link
                        onClick={() => goTo(`/profile/${partnerId}`)}
                        component="button"
                        underline="none"
                        color="secondary">
                        <Avatar style={{ margin: 'auto' }} alt="N" src={profile.profile_pic_path} />
                        <Typography variant="body1" style={{ color: theme.palette.primary.main }}>
                            {profile.first_name}
                        </Typography>
                    </Link>
                </Box>
                <Box 
                style={{position: "absolute", left: "80%"}}
                >
                    <Dropdown />
                    <Button onClick={(e) => handleChange(e, 0)}>
                        <HighlightOffOutlined
                            fontSize="small"
                            style={{ fill: theme.palette.text.primary }}
                        />
                    </Button>
                </Box>
            </Box>
            <Box ref={messageRef} mb={10} maxHeight="40vh" style={{ overflowY: 'auto' }}>
                {messages.length > 0 &&
                    messages.map((element) => {
                        const options = { month: 'short', day: 'numeric' };
                        const date = new Date(element.time_sent).toLocaleDateString(
                            'en-US',
                            options
                        );
                        return (
                            <Box p={1} key={element.id} textAlign={element.mine ? 'right' : 'left'}>
                                <Box
                                    borderRadius={
                                        element.mine ? '14px 14px 0 14px' : '14px 14px 14px 0'
                                    }
                                    bgcolor="#0c1023"
                                    border={
                                        element.mine ? '1px solid #ff749c' : '1px solid #b5bad3'
                                    }
                                    m={1}
                                    mr={element.mine ? 0 : 10}
                                    ml={element.mine ? 10 : 0}
                                    p={2}>
                                    <Typography>{element.message}</Typography>
                                </Box>
                                <Typography style={{ color: '#b5bad3', fontSize: 'small' }}>
                                    {date}
                                </Typography>
                            </Box>
                        );
                    })}
            </Box>
            <Box position="absolute" bottom={2} width="95%" m="5px">
                <form onSubmit={postMessage}>
                    <Box display="flex" px={2} py={1}>
                        <Box style={{ width: '90%' }}>
                            <TextField
                                autoComplete="off"
                                variant="outlined"
                                className={classesChat.inputField}
                                type="text"
                                name="textMessage"
                                value={textMessage}
                                onChange={onChange}
                            />
                        </Box>
                        <IconButton color="primary" type="submit" style={{ marginLeft: '20px' }}>
                            <Send />
                        </IconButton>
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

const mapStateToProps = (state) => ({
    profile: state.profile,
    chat: state.chat,
    auth: state.auth,
});

export default connect(mapStateToProps, { getMessages, getProfile })(withRouter(PrivateChat));
