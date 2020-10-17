import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography, Link, Button, TextField } from '@material-ui/core';
import { getMessages } from '../../actions/chat';
// import Messages from './Messages';
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
}) => {
    const [textMessage, setTextMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    const chat =
        currentConversation > 0 ? conversations.filter(chat => chat.chat_id === currentConversation)[0] : false;

    const partnerId = chat ? chat.partner_id : 0;
    // const classes = useStyles();

    useEffect(() => {
        getMessages(currentConversation);
        getProfile('otherUser', partnerId);
        if (partnerId !== 0) {
            socket.emit('JOIN_CHAT', chat.chat_id);
            socket.on('MESSAGE', chatId => {
                getMessages(currentConversation);
            });
        }
    }, [currentConversation, getMessages, partnerId, getProfile, socket]);

    const goTo = newRoute => {
        history.push(newRoute);
    };

    const postMessage = async e => {
        e.preventDefault();
        if (textMessage) {
            const result = await axios.post('/chat/message', {
                senderId: user.userId,
                receiverId: partnerId,
                content: textMessage,
            });
            setTextMessage('');
            socket.emit('SEND_MESSAGE', chat.chat_id);
        }
    };

    if (currentConversation === 0) {
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
            <Box mb={6}>
                {messages.length > 0 &&
                    messages.map(message => {
                        const options = { month: 'short', day: 'numeric' };
                        const date = new Date(message.time_sent).toLocaleDateString('en-US', options);
                        return (
                            <Box p={1} key={message.id} textAlign={message.mine ? 'right' : 'left'}>
                                <Box
                                    borderRadius={message.mine ? '14px 14px 0 14px' : '14px 14px 14px 0'}
                                    bgcolor={message.mine ? 'primary.light' : 'primary.main'}
                                    m={1}
                                    mr={message.mine ? 0 : 10}
                                    ml={message.mine ? 10 : 0}
                                    p={2}>
                                    <Typography>{message.message}</Typography>
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
                                onChange={e => {
                                    setTextMessage(e.target.value);
                                }}
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
