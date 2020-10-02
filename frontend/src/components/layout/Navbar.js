import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { logout } from '../../actions/auth';
import { MessageOutlined, PeopleOutline, FavoriteBorder, AccountCircle } from '@material-ui/icons';
import {
    Badge,
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    MenuItem,
    Menu,
    ListItemIcon,
    useMediaQuery,
} from '@material-ui/core';

const StyledMenu = withStyles(theme => ({
    paper: {
        border: '1px solid #000',
        background: theme.palette.secondary.main,
    },
}))(props => (
    <Menu
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        elevation={0}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        color: '#fff',
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
        '& .MuiListItemIcon-root': {
            color: theme.palette.common.white,
        },
    },
}))(MenuItem);

const Navbar = ({ logout, auth: { isAuthenticated, loading, user }, history }) => {
    const [profileSettings, setProfileSettings] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const isMedium = useMediaQuery(theme.breakpoints.down('sm'));
    // console.log(isMobile ? 'mobile' : 'not mobile');
    // console.log(isMedium ? 'medium' : 'not medium');
    const handleClick = event => {
        setProfileSettings(event.currentTarget);
    };

    const handleNavigation = newRoute => {
        history.push(newRoute);
        setProfileSettings(null);
    };

    const handleClose = () => {
        setProfileSettings(null);
    };

    const profileMenu = [
        {
            title: 'My profile',
            pageUrl: '/profile',
        },
        {
            title: 'Account Settings',
            pageUrl: '/likes',
        },
        {
            title: 'Visit history',
            pageUrl: '/profile',
        },
    ];

    const menuItems = [
        {
            title: 'Matches',
            pageUrl: '/matches',
            icon: <PeopleOutline />,
        },
        {
            title: 'Messages',
            pageUrl: '/messages',
            icon: <MessageOutlined />,
        },
        {
            title: 'Likes',
            pageUrl: '/likes',
            icon: <FavoriteBorder />,
        },
    ];

    return (
        // <Box display="flex" flexGrow="1">
        <AppBar color="secondary">
            <Toolbar>
                <Box display="flex" flexGrow={isMobile ? 0 : 1}>
                    {!isMobile && !isMedium && (
                        <IconButton onClick={() => handleNavigation('/')}>
                            <Typography className="pr-5" color="textSecondary" variant="h6">
                                <i className="fas fa-moon" /> Astro Matcha
                            </Typography>
                        </IconButton>
                    )}
                    {menuItems.map(menu => (
                        <IconButton key={menu.title} onClick={() => handleNavigation(menu.pageUrl)}>
                            <Typography className="pr-5" color="textPrimary" variant="h6">
                                <Badge className="pr-2">{menu.icon}</Badge> {!isMobile && menu.title}
                            </Typography>
                        </IconButton>
                    ))}
                </Box>
                <Box display="flex">
                    <IconButton onClick={handleClick}>
                        <Typography variant="h6" className="pr-5 capital" color="textSecondary">
                            <Badge className="pr-2">
                                <AccountCircle />
                            </Badge>
                            {!isMobile && user.username}
                        </Typography>
                    </IconButton>
                    <StyledMenu anchorEl={profileSettings} open={Boolean(profileSettings)} onClose={handleClose}>
                        {profileMenu.map(menuItem => (
                            <StyledMenuItem
                                key={menuItem.title}
                                onClick={() => handleNavigation(menuItem.pageUrl)}>
                                {menuItem.title}
                            </StyledMenuItem>
                        ))}
                    </StyledMenu>
                    <IconButton onClick={logout}>
                        <Typography variant="h6" color="textPrimary">
                            <i className="fas fa-sign-out-alt"></i> {!isMobile && 'Logout'}
                        </Typography>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
        // </Box>
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
