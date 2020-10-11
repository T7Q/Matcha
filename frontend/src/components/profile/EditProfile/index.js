import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createProfile } from '../../../actions/profile';

const EditProfile = ({ history }) => {
    const [formData, setFormData] = useState({
        gender: '',
        sex_preference: '',
        bio: '',
        birth_date: '',
        tags: '',
        country: '',
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return <Fragment></Fragment>;
};

EditProfile.propTypes = {
    // createProfile: PropTypes.func.isRequired,
};

export default connect(null, {})(withRouter(EditProfile));
