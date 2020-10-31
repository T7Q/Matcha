import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { componentStyles } from '../../../styles/componentStyles';

const BirthdayItem = ({ setFormData, formData, error }) => {
    const classes = componentStyles();

    const handleDate = (date) => {
        setFormData({ ...formData, birth_date: date });
    };

    return (
        <MuiPickersUtilsProvider utils={LuxonUtils}>
            <Box py={2}>
                <Typography variant="h5">When were you born?</Typography>
            </Box>
            <DatePicker
                disableFuture
                inputVariant="outlined"
                minDate="1902/01/01"
                openTo="year"
                format="yyyy/MM/dd"
                value={formData.birth_date}
                onChange={handleDate}
                className={classes.input}
                error={error ? true : false}
                helperText={error}
            />
        </MuiPickersUtilsProvider>
    );
};

export default BirthdayItem;
