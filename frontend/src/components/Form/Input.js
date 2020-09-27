import React from 'react';

const Input = ({ value, type, label, handleChange }) => {
    return (
        <div className='form-group'>
            <label htmlFor={[type]}>{label}</label>
            <input
                className='form-control'
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
