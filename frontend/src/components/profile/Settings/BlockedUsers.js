import React from 'react';
// import { TextField, FormGroup, Grid, Button } from '@material-ui/core';
// import { useStyles } from '../../../styles/custom';

const BlockedUsers = () => {
    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: '',
    // });

    // const { email, password } = formData;
    // const classes = useStyles();

    // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = event => {
        event.preventDefault();
        console.log('submit blocked users');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>some users</div>
        </form>
    );
};

export default BlockedUsers;
