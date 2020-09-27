import React from 'react';

const Password = ({ currentStep, password, handleChange }) => {
    if (currentStep !== 3) {
        // Prop: The current step
        return null;
    }

    return (
        <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
                className='form-control'
                id='password'
                name='password'
                type='text'
                placeholder='Enter password'
                value={password} // Prop: The email input data
                onChange={handleChange} // Prop: Puts data into state
            />
        </div>
    );
};

export default Password;
