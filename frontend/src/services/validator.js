import axios from 'axios';

const getAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const validateAtBackend = async (name, value) => {
    if (!value) return 'required field';
    let res = await axios.post('/account/validateData', {
        key: [name][0],
        value: value,
    });
    if (res.data.error && Object.keys(res.data.error).length > 0) {
        return res.data.error;
    }
    return '';
};

export const validateField = (name, value, password = '') => {
    let regexp;
    if (!value) return 'required field';

    switch (name) {
        case 'tags':
            if (value.length < 5) {
                return 'Choose minimum 5 tags';
            }
            return '';
        case 'email':
            regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regexp.test(String(value).toLowerCase())) {
                return 'Invalid email';
            }
            return '';
        case 'username':
        case 'firstname':
        case 'lastname':
            regexp = /^[A-Za-z0-9]{0,}$/;
            if (!regexp.test(value)) {
                return 'Name must include letters and numbers only';
            } else if (value.length >= 32) {
                return 'Name must be less 32 characters';
            }
            return '';
        case 'password':
            if (value.length < 6) {
                return 'Password must be at least 6 characters';
            } else {
                regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
                if (!regexp.test(value)) {
                    return 'At least 1 uppercase, 1 lowercase letter and 1 number required';
                }
            }
            return '';
        case 'confirmPassword':
            if (password !== value) {
                return 'Passwords do not match';
            }
            return '';
        case 'birthdate':
            let age = getAge(value);
            if (age < 18) {
                return '18 years required';
            } else if (age > 120) {
                return 'You must be alive';
            }
            return '';
        case 'bio':
            if (value.length > 200) {
                return 'should be less than 200 characters';
            }
            return '';
        default:
            return '';
    }
};
