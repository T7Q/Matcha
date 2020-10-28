export const validatePasswords = (name, value, password = '') => {
    switch (name) {
        case 'password':
            if (!value) {
                return 'required field';
            } else if (value.length < 6) {
                return 'Password must be at least 6 characters';
            } else {
                const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
                if (!re.test(value)) {
                    return 'At least 1 uppercase, 1 lowercase letter and 1 number required';
                } else {
                    return '';
                }
            }
        case 'confirmPassword':
            if (!value) {
                return 'required field';
            } else if (password !== value) {
                return 'Passwords do not match';
            } else {
                return '';
            }
        default:
            return '';
    }
};
