import React from 'react';

const Username = ({ currentStep, username, handleChange }) => {
    if (currentStep !== 2) {
        // Prop: The current step
        return null;
    }

    return (
        <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
                className='form-control'
                id='username'
                name='username'
                type='text'
                placeholder='Enter username'
                value={username} // Prop: The email input data
                onChange={handleChange} // Prop: Puts data into state
            />
        </div>
    );
};

export default Username;
