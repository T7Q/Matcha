import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography, Grid, Container } from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';
import { getConversations } from '../../actions/chat';
import { getMessageNotifications } from '../../actions/notifications';
import Conversations from './Conversations';
import PrivateChat from './PrivateChat';

const Chat = ({
    auth,
    notifications,
    getMessageNotifications,
    getConversations,
    chat: { conversations },
    history,
    ...props
}) => {
    const [currentConversation, setCurrentConversation] = useState(0);
    const [partnerTyping, setPartnerTyping] = useState({
        typing: false,
        chatId: 0,
    });
    const [lastMessage, setLastMessage] = useState({ text: '', chatId: 0 });
    const [active, setActive] = useState(null);

    // const theme = useTheme();
    let username = props.match.params.username;

    useEffect(() => {
        setActive(currentConversation);
    }, [currentConversation]);

    useEffect(() => {
        if (username !== 0 && conversations.some((el) => el.partner_username === username)) {
            setCurrentConversation(username);
        }
    }, [username, conversations]);

    useEffect(() => {
        let isMounted = true;
        auth.socket.on('TYPING_NOTIFICATION', (chatId, typing) => {
            isMounted && setPartnerTyping({ typing: typing, chatId: chatId });
        });
    }, [username, conversations, auth.socket]);

    useEffect(() => {
        let isMounted = true;
        // console.log('get conversations in chat index');
        getConversations();
        getMessageNotifications();
        auth.socket.on('UPDATE_NOTIFICATIONS', (type, chatId, text) => {
            if (isMounted && type === 'message') {
                if (text) setLastMessage({ text: text, chatId: chatId });
                // console.log('on update notification in chat index', text);
                getMessageNotifications();
            }
        });

        return () => {
            isMounted = false;
            auth.socket.off('TYPING_NOTIFICATION');
        };
    }, [getConversations, getMessageNotifications, auth.socket]);

    const handleChange = (event, newUsername, senderId) => {
        setCurrentConversation(newUsername);
        if (newUsername === 0) {
            history.push('/messages');
        } else {
            history.push('/messages/' + newUsername);
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
                bgcolor="secondary.main"
                pl={8}
                height="80px">
                <Container>
                    <Typography variant="h6">Messages</Typography>
                    <Typography variant="body1">Recent conversations</Typography>
                </Container>
            </Box>
            <Box flexGrow={1} display="flex" p={5}>
                <Container>
                    {conversations.length === 0 ? (
                        <Box textAlign="center">No conversations yet</Box>
                    ) : (
                        <Grid container>
                            <Grid container item sm={6} xs={12} justify="center">
                                <Conversations
                                    active={active}
                                    socket={auth.socket}
                                    partnerTyping={partnerTyping}
                                    messageNotifications={notifications.messages}
                                    conversations={conversations}
                                    handleChange={handleChange}
                                    lastMessage={lastMessage}
                                />
                            </Grid>
                            <Grid container justify="center" item sm={6} xs={12}>
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
