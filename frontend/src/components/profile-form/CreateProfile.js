import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createProfile } from '../../actions/profile';

const CreateProfile = ({ isAuthenticated, user, createProfile, history }) => {
    const [formData, setFormData] = useState({
        gender: '',
        sex_preference: '',
        bio: '',
        birth_date: '',
        tags: '',
        country: '',
    });

    if (isAuthenticated && user.status === 2) {
        return <Redirect to='/matches' />;
    } else if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }
    const { gender, sex_preference, bio, birth_date, tags, country } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };
    return (
        <Fragment>
            <h1 className='large text-primary'>Create Your Profile</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Let's get some information to make your profile stand out
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <select name='country' value={country} onChange={e => onChange(e)}>
                        <option value='0'>*Your country</option>
                        <option value='Spain'>Spain</option>
                        <option value='Finland'>Finland</option>
                        <option value='UK'>UK</option>
                    </select>
                </div>
                <div className='form-group'>
                    <select name='gender' value={gender} onChange={e => onChange(e)}>
                        <option value='0'>Your gender</option>
                        <option value='Woman'>Woman</option>
                        <option value='Man'>Man</option>
                    </select>
                </div>
                <div className='form-group'>
                    <select name='tags' value={tags} onChange={e => onChange(e)}>
                        <option value='0'>Your interests</option>
                        <option value='Cooking'>Cooking</option>
                        <option value='Art'>Art</option>
                        <option value='Foodie'>Foodie</option>
                    </select>
                </div>
                <div className='form-group'>
                    <select name='sex_preference' value={sex_preference} onChange={e => onChange(e)}>
                        <option value='0'>You are interested in</option>
                        <option value='Woman'>Woman</option>
                        <option value='Man'>Man</option>
                        <option value='UK'>Both</option>
                    </select>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='birth_date'
                        name='birth_date'
                        value={birth_date}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        If you want your latest repos and a Github link, include your username
                    </small>
                </div>
                <div className='form-group'>
                    <textarea
                        placeholder='A short bio of yourself'
                        name='bio'
                        value={bio}
                        onChange={e => onChange(e)}></textarea>
                    <small className='form-text'>Tell us a little about yourself</small>
                </div>
                <input type='submit' className='btn btn-primary my-1' />
            </form>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
