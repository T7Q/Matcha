export const getValue = (input, array) => {
    const initial = input ? array.find((n) => n.db === input) : '';
    const result = {
        label: input ? initial.label : '',
        db: input ? input : '',
    };
    return result;
};
