import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {
    PeopleIcon,
    MessageOutlined,
    PeopleOutline,
    FavoriteBorder,
    AccountCircle,
    MailIcon,
} from '@material-ui/icons';
import { Badge, AppBar, Toolbar, Typography, Box, Button, Tab, Tabs } from '@material-ui/core';

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
    const [value, setValue] = useState(0);
    // const guestLinks = (
    //     <ul>
    //         <li>
    //             <Link to='/register'>Register</Link>
    //         </li>
    //         <li>
    //             <Link to='/login'>Login</Link>
    //         </li>
    //     </ul>
    // );

    const authLinks = (
        <>
            <Tabs value={value} onChange={(e, v) => setValue(v)} variant='fullWidth'>
                <Tab label='matches'> </Tab>
                <Tab label='messages'></Tab>
                <Tab label='likes'></Tab>
                <Tab label='profile'> </Tab>
                <Tab label='Logout'></Tab>
            </Tabs>
            <a onClick={logout} href='#!'>
                <i className='fas fa-sign-out-alt'></i>
                Logout
            </a>
        </>
    );
    // <>
    // <Link to='/matches'>Matches</Link>
    // <Link to='/messages'>Messages</Link>
    // <Link to='/likes'>Likes</Link>
    // <Link to='/profile'>Profile</Link>
    // <a onClick={logout} href='#!'>
    //     <i className='fas fa-sign-out-alt'></i>
    //     Logout
    // </a>
    // </>

    return (
        <Box color='secondary.main' minWidth='100%'>
            <AppBar color='secondary' position='static'>
                <Toolbar className='flex'>
                    <Link className='decor-none' to='/'>
                        <Typography className='pr-5' color='textSecondary' variant='h6'>
                            <i className='fas fa-moon' /> Astro Matcha
                        </Typography>
                    </Link>
                    <Link className='decor-none' to='/matches'>
                        <Typography className='p-3' variant='h6' color='textPrimary'>
                            Matches
                        </Typography>
                    </Link>
                    <Link className='decor-none' to='/messages'>
                        <Typography className='p-3' variant='h6' color='textSecondary'>
                            Messages
                        </Typography>
                    </Link>
                    <Link className='decor-none' to='/likes'>
                        <Typography className='p-3' variant='h6' color='textSecondary'>
                            Likes
                        </Typography>
                    </Link>
                    <Link className='decor-none' to='/profile'>
                        <Typography variant='h6' className='p-3' color='textSecondary'>
                            Profile
                        </Typography>
                    </Link>
                    <Link className='decor-none' to='/' onClick={logout}>
                        <Typography variant='h6' color='textSecondary'>
                            <i className='fas fa-sign-out-alt'></i> Logout
                        </Typography>
                    </Link>
                    {/* {!loading && isAuthenticated ? (
                        user.status === 1 ? (
                            <a onClick={logout} href='#!'>
                                <i className='fas fa-sign-out-alt'></i>
                                Logout
                            </a>
                        ) : (
                            authLinks
                        )
                    ) : null} */}
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
