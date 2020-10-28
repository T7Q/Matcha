import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography, Grid, Container } from '@material-ui/core';
import { getConversations } from '../../actions/chat';
import { getMessageNotifications } from '../../actions/notifications';
import Conversations from './Conversations';
import PrivateChat from './PrivateChat';
import { chatStyles } from '../../styles/chatStyles';

const Chat = ({
    auth,
    notifications,
    getMessageNotifications,
    getConversations,
    chat: { conversations },
    history,
    ...props
}) => {
    const classesChat = chatStyles();
    const [currentConversation, setCurrentConversation] = useState(0);
    const [partnerTyping, setPartnerTyping] = useState({
        typing: false,
        chatId: 0,
    });
    const [lastMessage, setLastMessage] = useState({ text: '', chatId: 0 });
    const [active, setActive] = useState(null);

    let userId = props.match.params.userId;

    useEffect(() => {
        setActive(currentConversation);
    }, [currentConversation]);

    useEffect(() => {
        if (userId !== 0 && conversations.some((el) => el.partner_id === userId)) {
            setCurrentConversation(userId);
        }
    }, [userId, conversations]);

    useEffect(() => {
        let isMounted = true;
        auth.socket.on('TYPING_NOTIFICATION', (chatId, typing) => {
            isMounted && setPartnerTyping({ typing: typing, chatId: chatId });
        });
    }, [userId, conversations, auth.socket]);

    useEffect(() => {
        let isMounted = true;
        getConversations();
        getMessageNotifications();
        auth.socket.on('UPDATE_NOTIFICATIONS', (type, chatId, text) => {
            if (isMounted && type === 'message') {
                if (text) setLastMessage({ text: text, chatId: chatId });
                getMessageNotifications();
            }
        });

        return () => {
            isMounted = false;
            auth.socket.off('TYPING_NOTIFICATION');
        };
    }, [getConversations, getMessageNotifications, auth.socket]);

    const handleChange = (event, newUserId, senderId) => {
        setCurrentConversation(newUserId);
        if (newUserId === 0) {
            history.push('/messages');
        } else {
            history.push('/messages/' + newUserId);
            if (notifications.message > 0) {
                auth.socket.emit('SEE_CONVERSATION', auth.user.userId, senderId);
            }
        }
    };

    return (
        <Box minHeight="80vh" display="flex" flexDirection="column">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                // bgcolor="secondary.main"
                pl={8}
                boxShadow={6}
                className={classesChat.header}>
                <Container>
                    <Grid
                        container
                        item
                        sm={4}
                        xs={12}
                        justify="space-around"
                        direction="column"
                        alignItems="flex-start"
                        spacing={1}>
                        <Typography
                            variant="h5"
                            // className={classesChat.headerText}
                        >
                            Messages
                        </Typography>
                    </Grid>
                </Container>
            </Box>
            <Box flexGrow={1} display="flex" p={5}>
                <Container>
                    {conversations.length === 0 ? (
                        <Box textAlign="center">No conversations yet</Box>
                    ) : (
                        <Grid container spacing={4} className={classesChat.chatGrid}>
                            <Grid
                                container
                                item
                                sm={4}
                                xs={12}
                                direction="column"
                                justify="space-around"
                                alignItems="center"
                                spacing={1}
                                className={classesChat.leftSide}>
                                <Typography className={classesChat.titleChats} variant="h6">
                                    Recent conversations
                                </Typography>
                                <Box className={classesChat.listBox}>
                                    <Conversations
                                        active={active}
                                        socket={auth.socket}
                                        partnerTyping={partnerTyping}
                                        messageNotifications={notifications.messages}
                                        conversations={conversations}
                                        handleChange={handleChange}
                                        lastMessage={lastMessage}
                                    />
                                </Box>
                            </Grid>
                            <Grid
                                item
                                container
                                justify="center"
                                alignItems="center"
                                sm={6}
                                xs={12}
                                className={classesChat.rightSide}>
                                <PrivateChat
                                    handleChange={handleChange}
                                    notifications={notifications}
                                    currentConversation={currentConversation}
                                />
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

Chat.propTypes = {
    getConversations: PropTypes.func.isRequired,
    getMessageNotifications: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    chat: state.chat,
    notifications: state.notifications,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getMessageNotifications,
    getConversations,
})(Chat);
