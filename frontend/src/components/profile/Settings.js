import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Input from '../common/Input';
import WizardForm from '../common/WizardForm';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const Settings = () => {
    return (
        <Box>
            <Box textAlign="center">
                <Typography>Account Settings</Typography>
            </Box>
            <Box display="flex">
                <Box>
                    <List aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Trash" />
                        </ListItem>
                        <ListItem button component="a" href="#simple-list">
                            <ListItemText primary="Spam" />
                        </ListItem>
                    </List>
                </Box>
                <Box></Box>
            </Box>
        </Box>
    );
};

export default Settings;
