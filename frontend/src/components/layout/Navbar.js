import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { logout } from '../../actions/auth';
import {
    MessageOutlined,
    PeopleOutline,
    FavoriteBorder,
    AccountCircle,
    MailIcon,
    ExitToApp,
    Brightness2,
} from '@material-ui/icons';
import {
    Badge,
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    Tab,
    Tabs,
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
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const useStyles = makeStyles(theme => ({
    root: {
        flexFlow: 1,
    },
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

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
    const classes = useStyles();
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

    return (
        <AppBar color="secondary">
            <Toolbar>
                <Box display="flex" flexGrow={isMobile ? 0 : 1}>
                    <IconButton onClick={() => handleNavigation('/')}>
                        <Typography className="pr-5" color="textSecondary" variant="h6">
                            <i className="fas fa-moon" /> Astro Matcha
                        </Typography>
                    </IconButton>
                    <IconButton onClick={() => handleNavigation('/matches')}>
                        <Typography className="pr-5" variant="h6" color="textPrimary">
                            <Badge className="pr-2">
                                <PeopleOutline />
                            </Badge>
                            Matches
                        </Typography>
                    </IconButton>
                    <IconButton onClick={() => handleNavigation('/messages')}>
                        <Typography className="pr-5" variant="h6" color="textPrimary">
                            <Badge className="pr-2">
                                <MessageOutlined />
                            </Badge>
                            Messages
                        </Typography>
                    </IconButton>
                    <IconButton onClick={() => handleNavigation('/likes')}>
                        <Typography className="pr-5" variant="h6" color="textPrimary">
                            <Badge className="pr-2">
                                <FavoriteBorder />
                            </Badge>
                            Likes
                        </Typography>
                    </IconButton>
                </Box>
                <Box display="flex">
                    <IconButton onClick={handleClick}>
                        <Typography variant="h6" className="pr-5 capital" color="textSecondary">
                            <Badge className="pr-2">
                                <AccountCircle />
                            </Badge>
                            {user.username}
                        </Typography>
                    </IconButton>
                    <StyledMenu
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        anchorEl={profileSettings}
                        keepMounted
                        open={Boolean(profileSettings)}
                        onClose={handleClose}>
                        {profileMenu.map(menuItem => (
                            <StyledMenuItem onClick={() => handleNavigation(menuItem.pageUrl)}>
                                {menuItem.title}
                            </StyledMenuItem>
                        ))}
                    </StyledMenu>
                    <IconButton onClick={logout}>
                        <Typography variant="h6" color="textPrimary">
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </Typography>
                    </IconButton>
                </Box>
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
