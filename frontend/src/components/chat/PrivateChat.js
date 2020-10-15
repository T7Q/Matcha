import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Fab, Typography, Link, Button } from '@material-ui/core';
import { getMessages } from '../../actions/chat';
import Messages from './Messages';
import { Avatar } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Dropdown from '../common/Dropdown';
import { getProfile } from '../../actions/profile';
import { useStyles } from '../../styles/custom';

const PrivateChat = ({
    getProfile,
    getMessages,
    currentConversation,
    chat: { messages, conversations },
    profile: { profile },
    history,
    setCurrentConversation,
}) => {
    const [textMessage, setTextMessage] = useState('');
    const partnerId = currentConversation > 0 ? conversations[currentConversation - 1].partner_id : 0;
    const classes = useStyles();

    useEffect(() => {
        getMessages(currentConversation);
        getProfile('otherUser', partnerId);
    }, [currentConversation]);

    const isMessageEmpty = () => {
        return textMessage.trim().length === 0;
    };

    const goTo = newRoute => {
        history.push(newRoute);
    };

    const disableButton = isMessageEmpty(textMessage);

    return (
        <>
            {messages && messages.length > 0 && currentConversation > 0 ? (
                <Box bgcolor="secondary.light" display="flex" flexDirection="column" p="5px" minWidth="100%">
                    <Box borderBottom={1} display="flex" alignItems="center">
                        <Box flexGrow={1} textAlign="center">
                            <Link
                                onClick={() => goTo(`/profile/${partnerId}`)}
                                component="button"
                                underline="none"
                                color="secondary">
                                <Avatar style={{ margin: 'auto' }} alt="N" />
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
                    {messages.map((message, index) => {
                        const imageThumbnail = message.mine ? null : <Avatar src={message.imageUrl} alt="N" />;
                        return (
                            <div key={message.id}>
                                {imageThumbnail}
                                <div>{message.message}</div>
                                <div>{message.time_sent}</div>
                            </div>
                        );
                    })}
                    <form>
                        <input
                            type="text"
                            placeholder="type a message"
                            value={textMessage}
                            onChange={e => {
                                setTextMessage(e.target.value);
                            }}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            size="small"
                            disabled={disableButton}>
                            Send
                        </Button>
                    </form>
                </Box>
            ) : (
                <></>
            )}
        </>
    );
};

PrivateChat.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getMessages: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    chat: state.chat,
});

export default connect(mapStateToProps, { getMessages, getProfile })(withRouter(PrivateChat));
