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
                    <h1 className='x-large'>HOROSCOPE WHEEL HERE</h1>
                    <div className='lead'>
                        <div className='buttons'>
                            <Link to='/register' className='btn btn-primary'>
                                Register
                            </Link>
                            <Link to='/login' className='btn btn-light'>
                                Login
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
