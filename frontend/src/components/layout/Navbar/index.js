import React, { useState, useEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ExitToAppOutlined } from '@material-ui/icons';
import { Badge, AppBar, Toolbar, Typography, Box, IconButton } from '@material-ui/core';
import { navStyles } from '../../../styles/navStyles';
import { logout } from '../../../actions/auth';
import ProfileMenu from './ProfileMenu';
import NavItem from './NavItem';
import { getNotifications, updateNotifications } from '../../../actions/notifications';

const Navbar = ({
    logout,
    auth,
    history,
    getNotifications,
    updateNotifications,
    notifications,
    ...props
}) => {
    const [profileSettings, setProfileSettings] = useState(null);
    const [active, setActive] = useState('Matches');
    const { isAuthenticated, user } = auth;
    const classes = navStyles();
    const location = useLocation();

    useEffect(() => {
        setActive(location.pathname.split('/')[1]);
    }, [location]);

    const handleNavigation = (newRoute) => {
        history.push(newRoute);
        setProfileSettings(null);
    };

    return (
        <AppBar color="secondary" className={isAuthenticated ? classes.appBar : ''}>
            <Toolbar>
                <Box justifyContent="flex-start" display="flex" flexGrow={2}>
                    <IconButton
                        className={`${classes.iconButton} ${classes.hideMedium}`}
                        onClick={() => {
                            setActive('Matches');
                            handleNavigation('/');
                        }}>
                        <Typography color="textPrimary" variant="h6">
                            Astro Matcha
                        </Typography>
                    </IconButton>
                    <NavItem
                        active={active}
                        setActive={setActive}
                        updateNotifications={updateNotifications}
                        notifications={notifications}
                        getNotifications={getNotifications}
                        auth={auth}
                        handleNavigation={handleNavigation}
                    />
                </Box>
                {isAuthenticated && (
                    <Box display="flex">
                        {user.status === 2 && (
                            <ProfileMenu
                                active={active}
                                setActive={setActive}
                                notifications={notifications}
                                getNotifications={getNotifications}
                                auth={auth}
                                profileSettings={profileSettings}
                                setProfileSettings={setProfileSettings}
                                handleNavigation={handleNavigation}
                            />
                        )}
                        <IconButton className={classes.iconButton} onClick={() => logout(history)}>
                            <Typography
                                variant="button"
                                className={classes.mobileText}
                                color="textSecondary">
                                <Badge>
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
    updateNotifications: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    notifications: state.notifications,
});

export default connect(mapStateToProps, { updateNotifications, getNotifications, logout })(
    withRouter(Navbar)
);
