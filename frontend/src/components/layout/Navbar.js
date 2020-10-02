import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { logout } from '../../actions/auth';
import {
    MessageOutlined,
    PeopleOutline,
    FavoriteBorder,
    AccountCircle,
    ExitToAppOutlined,
} from '@material-ui/icons';
import {
    Badge,
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    MenuItem,
    Menu,
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

const useStyles = makeStyles(theme => ({
    customButton: {
        flex: '0 1 auto',
        [theme.breakpoints.down('xs')]: {
            padding: '15px 5px',
        },
    },
    text: {
        fontSize: '10px',
    },
    pr: {
        paddingRight: '5px',
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const isMedium = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

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
        <AppBar color="secondary" className={isMobile ? classes.appBar : ''}>
            <Toolbar>
                <Box justifyContent="flex-start" display="flex" flexGrow={2}>
                    {!isMobile && !isMedium && (
                        <IconButton className={classes.customButton} onClick={() => handleNavigation('/')}>
                            <Typography color="textSecondary" variant="h6">
                                <i className="fas fa-moon" /> Astro Matcha
                            </Typography>
                        </IconButton>
                    )}
                    {menuItems.map(menu => (
                        <IconButton
                            key={menu.title}
                            className={classes.customButton}
                            onClick={() => handleNavigation(menu.pageUrl)}>
                            <Typography
                                color="textPrimary"
                                className={isMobile ? classes.text : ''}
                                variant="button">
                                <Badge className={classes.pr}>{menu.icon}</Badge> {menu.title}
                            </Typography>
                        </IconButton>
                    ))}
                </Box>
                <Box display="flex">
                    <IconButton className={classes.customButton} onClick={handleClick}>
                        <Typography
                            variant="button"
                            className={isMobile ? classes.text : ''}
                            color="textSecondary">
                            <Badge className={classes.pr}>
                                <AccountCircle />
                            </Badge>
                            {isMobile ? 'profile' : user.username}
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
                    <IconButton className={classes.customButton} onClick={logout}>
                        <Typography variant="button" className={isMobile ? classes.text : ''} color="textPrimary">
                            <Badge className={classes.pr}>
                                <ExitToAppOutlined />
                            </Badge>
                            Logout
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
