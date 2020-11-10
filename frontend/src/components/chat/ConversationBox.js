import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { Link, Badge, Box } from '@material-ui/core';
import { ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import OnlineBadge from './OnlineBadge';
import { systemStyles } from '../../styles/systemStyles';

const ConversationBox = ({
    unread,
    conversation,
    active,
    handleChange,
    partnerTyping,
    lastMessage,
    socket,
}) => {
    const history = useHistory();
    const classes = systemStyles();
    const { partner_id } = conversation;

    const handleClick = () => {
        history.push(`/profile/${partner_id}`);
    };

    return (
        <ListItem
            className={clsx(classes.borderBottom, classes.minHeight80, classes.pl0, {
                [classes.bgSome]: active === partner_id,
            })}
            button>
            <Link onClick={handleClick} component="button">
                <ListItemAvatar>
                    <OnlineBadge socket={socket} profile={conversation} />
                </ListItemAvatar>
            </Link>
            <ListItemText
                className={clsx(classes.pl15, {
                    [classes.mainClr]: active === partner_id,
                    [classes.infoColor]: active !== partner_id,
                })}
                onClick={(e) => handleChange(e, partner_id, conversation.sender_id)}
                primary={
                    <span>
                        {conversation.partner_name} {conversation.partner_surname}
                    </span>
                }
                secondary={
                    <Box component="span" display="flex">
                        <Box
                            flexGrow={1}
                            component="span"
                            display="block"
                            textOverflow="ellipsis"
                            whiteSpace="noWrap"
                            overflow="hidden">
                            {partnerTyping.typing && partnerTyping.chatId === conversation.chat_id
                                ? 'is typing...'
                                : lastMessage.chatId === conversation.chat_id
                                ? lastMessage.text
                                : conversation.last_message}{' '}
                        </Box>
                        {unread !== 0 && (
                            <Badge
                                badgeContent={unread}
                                max={99}
                                color="primary"
                                className={classes.floatRight}
                            />
                        )}
                    </Box>
                }
            />
        </ListItem>
    );
};

export default ConversationBox;
