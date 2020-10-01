import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #000',
        background: '#000',
    },
})(props => (
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

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
    const [profileSettings, setProfileSettings] = useState(null);

    const handleClick = event => {
        setProfileSettings(event.currentTarget);
    };

    const handleClose = () => {
        setProfileSettings(null);
    };

    const userStatus1 = (
        <Link className="link-decor" to="/" onClick={logout}>
            <Typography variant="h6" color="textPrimary">
                <i className="fas fa-sign-out-alt"></i> Logout
            </Typography>
        </Link>
    );

    const authLinks = [
        <>
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
        </>,
        <>
            <Link className="link-decor" to="">
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
                        <StyledMenuItem onClick={handleClose}>
                            <Link to="/profile">My profile</Link>
                            {/* <ListItemIcon></ListItemIcon> */}
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleClose}>
                            <Link to="/profile">Account Settings</Link>
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleClose}>
                            <Link to="/profile">Visit history</Link>
                        </StyledMenuItem>
                    </StyledMenu>
                </Typography>
            </Link>
            <Link className="link-decor" to="/" onClick={logout}>
                <Typography variant="h6" color="textPrimary">
                    <i className="fas fa-sign-out-alt"></i> Logout
                </Typography>
            </Link>
        </>,
    ];

    return (
        <Box maxWidth="100%">
            <AppBar color="secondary" position="static">
                <Toolbar className="flex">
                    <Box display="flex" flexGrow={1}>
                        <Link className="link-decor" to="/">
                            <Typography className="pr-5" color="textSecondary" variant="h6">
                                <i className="fas fa-moon" /> Astro Matcha
                            </Typography>
                        </Link>
                        {!loading && isAuthenticated && user.status !== 1 && authLinks[0]}
                    </Box>
                    {!loading && isAuthenticated ? (user.status === 1 ? userStatus1 : authLinks[1]) : null}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
