import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography, Grid } from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';
import { getConversations } from '../../actions/chat';
import { getMessageNotifications } from '../../actions/notifications';
import Conversations from './Conversations';
import PrivateChat from './PrivateChat';

const Chat = ({ auth, notifications, getMessageNotifications, getConversations, chat: { conversations } }) => {
    const [currentConversation, setCurrentConversation] = useState(0);

    // const theme = useTheme();

    useEffect(() => {
        getConversations();
        getMessageNotifications();
    }, [getConversations, getMessageNotifications]);

    const handleChange = (event, chatId, senderId) => {
        setCurrentConversation(chatId);
        if (notifications.message > 0) {
            auth.socket.emit('SEE_CONVERSATION', auth.user.userId, senderId);
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
                <Typography variant="h5">Messages</Typography>
                <Typography variant="h6">Recent conversations</Typography>
            </Box>
            <Box flexGrow={1} display="flex" p={5}>
                <Grid container>
                    <Grid container item sm={6} xs={12} justify="center">
                        <Conversations
                            messageNotifications={notifications.messages}
                            conversations={conversations}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid container justify="center" item sm={6} xs={12}>
                        <PrivateChat
                            setCurrentConversation={setCurrentConversation}
                            currentConversation={currentConversation}
                        />
                    </Grid>
                </Grid>
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

const mapStateToProps = state => ({
    chat: state.chat,
    notifications: state.notifications,
    auth: state.auth,
});

export default connect(mapStateToProps, { getMessageNotifications, getConversations })(Chat);
