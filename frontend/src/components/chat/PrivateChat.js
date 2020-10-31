import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Link, Button, IconButton, Avatar } from '@material-ui/core';
import HighlightOffOutlined from '@material-ui/icons/HighlightOff';
import { Send } from '@material-ui/icons';

import chatService from '../../services/chatService';
import { getMessages } from '../../actions/chat';
import { getProfile } from '../../actions/profile';
import { systemStyles } from '../../styles/systemStyles';
import { chatStyles } from '../../styles/chatStyles';
import Dropdown from '../profile/viewProfile/DropdownItem';
import Spinner from '../layout/Spinner';
import Input from '../common/Input';

const PrivateChat = ({ currentConversation, handleChange }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, socket } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.profile);
    const { messages, conversations, loading } = useSelector((state) => state.chat);
    const classesChat = chatStyles();
    const classes = systemStyles();
    const [textMessage, setTextMessage] = useState('');
    const chat = currentConversation
        ? conversations.filter((chat) => chat.partner_id === currentConversation)[0]
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
            dispatch(getMessages(chat.chat_id));
            dispatch(getProfile('otherUser', partnerId, false));
            socket.emit('JOIN_CHAT', chat.chat_id);
            socket.on('MESSAGE', (chatId) => {
                if (isMounted && chat.chat_id === chatId) {
                    dispatch(getMessages(chatId));
                    socket.emit('SEE_CONVERSATION', user.userId, partnerId);
                }
            });
        }
        return () => {
            isMounted = false;
            socket.off('MESSAGE');
            socket.emit('TYPING_NOTIFICATION', chat.chat_id, false, partnerId);
        };
    }, [currentConversation, dispatch, partnerId, socket, chat, user.userId]);

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
            chatService.postMessage({
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
    } else if (loading) {
        return <Spinner />;
    }

    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="column"
            minWidth="100%"
            className={classesChat.chat}>
            <Box display="flex" alignItems="center" className={classes.borderBottom}>
                <Box flexGrow={1} textAlign="center" flexDirection="row">
                    <Link
                        onClick={() => goTo(`/profile/${partnerId}`)}
                        component="button"
                        underline="none"
                        style={{ display: 'flex', padding: '10px', alignItems: 'center' }}
                        color="secondary">
                        <Avatar
                            className={`${classes.mr10} ${classes.mLeft20}`}
                            alt="N"
                            src={profile.profile_pic_path}
                        />
                        <Typography className={classes.mainClr}>{profile.first_name}</Typography>
                    </Link>
                </Box>
                <Box className={classesChat.closeBlock}>
                    <Dropdown />
                    <Button onClick={(e) => handleChange(e, 0)}>
                        <HighlightOffOutlined fontSize="small" className={classes.fillPrimary} />
                    </Button>
                </Box>
            </Box>
            <Box ref={messageRef} mb={10} maxHeight="40vh" className={classes.overflowY}>
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
                                    className={element.mine ? classesChat.mine : classesChat.other}>
                                    <Typography>{element.message}</Typography>
                                </Box>
                                <Typography className={`${classes.fontSmall} ${classes.someColor}`}>
                                    {date}
                                </Typography>
                            </Box>
                        );
                    })}
            </Box>
            <Box position="absolute" bottom={2} width="95%" m="5px">
                <form onSubmit={postMessage}>
                    <Box display="flex" px={2} py={1}>
                        <Box width="90%">
                            <Input
                                autoComplete="off"
                                customClass="chatInput"
                                name="textMessage"
                                value={textMessage}
                                onChange={onChange}
                            />
                        </Box>
                        <IconButton color="primary" type="submit" className={classes.mLeft20}>
                            <Send />
                        </IconButton>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default PrivateChat;
