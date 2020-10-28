import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ExitToAppOutlined } from '@material-ui/icons';
import { Badge, AppBar, Toolbar, Typography, Box, IconButton } from '@material-ui/core';

import { navStyles } from '../../../styles/navStyles';
import { logout } from '../../../actions/auth';

import ProfileMenu from './ProfileMenu';
import NavItem from './NavItem';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [active, setActive] = useState('Matches');
    const classes = navStyles();

    useEffect(() => {
        setActive(location.pathname.split('/')[1]);
    }, [location]);

    const handleNavigation = (newRoute) => {
        history.push(newRoute);
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
                        handleNavigation={handleNavigation}
                    />
                </Box>
                {isAuthenticated && (
                    <Box display="flex">
                        {user.status === 2 && (
                            <ProfileMenu
                                active={active}
                                setActive={setActive}
                                handleNavigation={handleNavigation}
                            />
                        )}
                        <IconButton
                            className={classes.iconButton}
                            onClick={() => dispatch(logout(history))}>
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

export default Navbar;
