import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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

    const handleClick = (event, newRoute) => {
        setProfileSettings(event.currentTarget);
    };

    const handleProfile = newRoute => {
        history.push(newRoute);
    };

    const handleClose = () => {
        setProfileSettings(null);
    };

    return (
        <div className={classes.root}>
            <AppBar color="secondary">
                <Toolbar>
                    <Box display="flex" flexGrow={1}>
                        <Link className="link-decor" to="/">
                            <Typography className="pr-5" color="textSecondary" variant="h6">
                                <i className="fas fa-moon" /> Astro Matcha
                            </Typography>
                        </Link>
                        <Link className="link-decor" to="/matches">
                            <Typography className="pr-5" variant="h6" color="textPrimary">
                                <Badge className="pr-2">
                                    <PeopleOutline />
                                </Badge>
                                Matches
                            </Typography>
                        </Link>
                        <Link className="link-decor" to="/messages">
                            <Typography className="pr-5" variant="h6" color="textPrimary">
                                <Badge className="pr-2">
                                    <MessageOutlined />
                                </Badge>
                                Messages
                            </Typography>
                        </Link>
                        <Link className="link-decor" to="/likes">
                            <Typography className="pr-5" variant="h6" color="textPrimary">
                                <Badge className="pr-2">
                                    <FavoriteBorder />
                                </Badge>
                                Likes
                            </Typography>
                        </Link>
                    </Box>
                    <Box display="flex">
                        <Typography variant="h6" className="pr-5" color="textSecondary">
                            <Button onClick={handleClick}>
                                <Badge className="pr-2">
                                    <AccountCircle />
                                </Badge>
                                Profile
                            </Button>
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
                                <StyledMenuItem onClick={() => handleProfile('/profile')}>
                                    <Link className="link-decor" to="/profile">
                                        <ListItemIcon>My profile</ListItemIcon>
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem onClick={() => handleProfile('/profile')}>
                                    <Link className="link-decor" to="/profile">
                                        <ListItemIcon>Account Settings</ListItemIcon>
                                    </Link>
                                </StyledMenuItem>
                                <StyledMenuItem onClick={() => handleProfile('/profile')}>
                                    <Link className="link-decor" to="/profile">
                                        <ListItemIcon>Visit history</ListItemIcon>
                                    </Link>
                                </StyledMenuItem>
                            </StyledMenu>
                        </Typography>
                        <Link className="link-decor" to="/" onClick={logout}>
                            <Typography variant="h6" color="textPrimary">
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </Typography>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
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
