import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/matches' />;
    }
    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>Your love Is In The Stars</h1>
                    <div className='lead'>
                        <div className='buttons'>
                            <Link to='/register' className='btn btn-primary'>
                                Create Account
                            </Link>
                            <p>or</p>
                            <Link to='/login' className='btn btn-light'>
                                Log in with Google
                            </Link>
                            <br />
                            <Link to='/login' className='btn btn-light'>
                                Log in with email
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
