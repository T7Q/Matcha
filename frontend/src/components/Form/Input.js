import React from 'react';

const Input = ({ currentStep, requiredStep, value, type, label, handleChange }) => {
    if (currentStep !== requiredStep) {
        // Prop: The current step
        return null;
    }

    return (
        <div className='form-group'>
            <label htmlFor={[type]}>{label}</label>
            <input
                className='form-control'
                id={[type]}
                name={[type]}
                type={type === 'email' || type === 'password' ? [type] : 'text'}
                placeholder={[type]}
                value={value} // Prop: The email input data
                onChange={handleChange} // Prop: Puts data into state
            />
        </div>
    );
};

export default Input;
