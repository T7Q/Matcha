import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import { ExitToAppOutlined } from '@material-ui/icons';
import { Badge, AppBar, Toolbar, Typography, Box, IconButton, useMediaQuery } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
import { logout } from '../../../actions/auth';
import ProfileMenu from './ProfileMenu';
import NavItem from './NavItem';
import { getNotifications } from '../../../actions/notifications';

const Navbar = ({ logout, auth, history, getNotifications, notifications }) => {
    const [profileSettings, setProfileSettings] = useState(null);
    const { isAuthenticated, user } = auth;
    const theme = useTheme();
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const isMedium = useMediaQuery(theme.breakpoints.down('sm'));

    const handleNavigation = newRoute => {
        history.push(newRoute);
        setProfileSettings(null);
    };

    return (
        <AppBar color="secondary" className={isMobile && isAuthenticated ? classes.appBar : ''}>
            <Toolbar>
                <Box justifyContent="flex-start" display="flex" flexGrow={2}>
                    {((!isMobile && !isMedium) || !isAuthenticated) && (
                        <IconButton className={classes.customIconButton} onClick={() => handleNavigation('/')}>
                            <Typography color="textPrimary" variant="h6">
                                <i className="fas fa-moon" /> Astro Matcha
                            </Typography>
                        </IconButton>
                    )}
                    <NavItem
                        notifications={notifications}
                        getNotifications={getNotifications}
                        isMobile={isMobile}
                        auth={auth}
                        handleNavigation={handleNavigation}
                    />
                </Box>
                {isAuthenticated && (
                    <Box display="flex">
                        {user.status === 2 && (
                            <ProfileMenu
                                notifications={notifications}
                                getNotifications={getNotifications}
                                auth={auth}
                                profileSettings={profileSettings}
                                setProfileSettings={setProfileSettings}
                                handleNavigation={handleNavigation}
                                isMobile={isMobile}
                            />
                        )}
                        <IconButton className={classes.customIconButton} onClick={() => logout(history)}>
                            <Typography
                                variant="button"
                                className={isMobile ? classes.text : ''}
                                color="textSecondary">
                                <Badge className={classes.pr}>
                                    <ExitToAppOutlined />
                                </Badge>
                                Logout
                            </Typography>
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getNotifications: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    notifications: state.notifications,
});

export default connect(mapStateToProps, { getNotifications, logout })(withRouter(Navbar));
