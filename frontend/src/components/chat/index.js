import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography, Grid, Tab, Tabs, useMediaQuery, Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { NotificationsActive, Lock, Email, Block, Delete } from '@material-ui/icons';
import { setSnackbar } from '../../actions/setsnackbar';
import { getConversations } from '../../actions/chat';
import Conversations from './Conversations';
import PrivateChat from './PrivateChat';

const Chat = ({ setSnackbar, getConversations, chat: { conversations } }) => {
    const [currentConversation, setCurrentConversation] = useState({ id: 0 });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        getConversations();
    }, []);

    const handleChange = (event, newConversation) => {
        setCurrentConversation(newConversation);
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
            <Box alignItems="center" flexGrow={1} display="flex">
                <Container>
                    <Grid container>
                        <Grid style={{ backgroundColor: 'green' }} container item sm={6} xs={12} justify="center">
                            <Conversations
                                conversations={conversations}
                                currentConversation={currentConversation}
                            />
                        </Grid>
                        <Grid style={{ backgroundColor: 'blue' }} container justify="center" item sm={6} xs={12}>
                            <PrivateChat />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

Chat.propTypes = {
    setSnackbar: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    chat: state.chat,
});

export default connect(mapStateToProps, { setSnackbar, getConversations })(Chat);
