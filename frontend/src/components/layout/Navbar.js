import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { AppBar, Toolbar, Typography, Box, Button } from '@material-ui/core';

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
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
            <Link to='/matches'>Matches</Link>
            <Link to='/messages'>Messages</Link>
            <Link to='/likes'>Likes</Link>
            <Link to='/profile'>Profile</Link>
            <a onClick={logout} href='#!'>
                <i className='fas fa-sign-out-alt'></i>
                Logout
            </a>
        </>
    );

    return (
        <Box color='secondary.main' minWidth='100%'>
            <AppBar color='secondary' position='static'>
                <Toolbar>
                    <Link to='/'>
                        <Typography variant='h6'>
                            <i className='fas fa-moon' /> Astro Matcha
                        </Typography>
                    </Link>
                    {!loading && isAuthenticated ? (
                        user.status === 1 ? (
                            <a onClick={logout} href='#!'>
                                <i className='fas fa-sign-out-alt'></i>
                                Logout
                            </a>
                        ) : (
                            authLinks
                        )
                    ) : null}
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
