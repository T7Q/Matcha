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

const Navbar = ({ logout, auth: { isAuthenticated, user }, history }) => {
    const [profileSettings, setProfileSettings] = useState(null);
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
                        isMobile={isMobile}
                        isAuthenticated={isAuthenticated}
                        user={user}
                        handleNavigation={handleNavigation}
                    />
                </Box>
                {isAuthenticated && (
                    <Box display="flex">
                        {user.status === 2 && (
                            <ProfileMenu
                                user={user}
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
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
