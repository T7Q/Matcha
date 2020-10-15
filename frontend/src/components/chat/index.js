import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography, Grid, Tab, Tabs, useMediaQuery, Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { NotificationsActive, Lock, Email, Block, Delete } from '@material-ui/icons';
import { setSnackbar } from '../../actions/setsnackbar';
import { getConversations } from '../../actions/chat';

const Chat = ({ setSnackbar, getConversations, chat: { conversations } }) => {
    const [currentConversation, setCurrentConversation] = useState(0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        getConversations();
    }, [getConversations]);

    const handleChange = (event, newConversation) => {
        setCurrentConversation(newConversation);
    };

    const Conversations = () => {
        switch (currentConversation) {
            case 0:
                return <></>;
            default:
                return <>default</>;
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
            <Box alignItems="center" flexGrow={1} display="flex">
                <Container>
                    <Grid container>
                        <Grid style={{ backgroundColor: 'white' }} container item sm={6} xs={12} justify="center">
                            {conversations.map(item => (
                                <Tab key={item.chat_id} label={item.partner_username} />
                            ))}
                            <Tab label="&emsp;Delete account &nbsp; &nbsp;&emsp;&#8811;" icon={<Delete />} />
                        </Grid>
                        <Grid
                            style={{ backgroundColor: 'blue' }}
                            container
                            justify={isMobile ? 'center' : 'flex-start'}
                            item
                            sm={6}
                            xs={12}>
                            <Box pt={3} m={3}>
                                {currentConversation === 0 && <></>}
                                {currentConversation === 1 && <div>message</div>}
                                {currentConversation === 2 && <div>message</div>}
                                {currentConversation === 3 && <div>message</div>}
                                {currentConversation === 4 && <div>message</div>}
                                {currentConversation === 5 && <div>message</div>}
                            </Box>
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
