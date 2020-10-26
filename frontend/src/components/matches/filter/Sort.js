import React from 'react';

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Sort = ({ updateFilter, setFilter, filterIsOn, filter }) => {
    const classesFilter = filterStyles();
    const sort = [
        { label: 'Yongest', db: 'age_asc' },
        { label: 'Oldest', db: 'age_desc' },
        { label: 'Best rating', db: 'fame_desc' },
        { label: 'Lowest rating', db: 'fame_asc' },
        { label: 'Closest', db: 'distance_asc' },
        { label: 'Furtherst away', db: 'distance_desc' },
        { label: 'Most interest in common', db: 'commonTag_desc' },
        { label: 'Least interest in common', db: 'commonTag_asc' },
    ];

    const handleSortChange = (event, newValue) => {
        let value = [];
        if (newValue !== null) {
            value[0] = newValue.db;
        }
        updateFilter({
            ...filter,
            order: value,
        });
        setFilter(filterIsOn + 1);
    };

    const findValue = () => {
        if (filter.order === '') {
            return '';
        } else {
            console.log('changed here');
            return sort.filter(element => {
                if (element.db === filter.order) return element.label;
                return false; // changed here;
            });
        }
    };

    return (
        <Autocomplete
            id="combo-sort"
            onChange={handleSortChange}
            options={sort}
            getOptionLabel={option => option.label}
            getOptionSelected={option => option}
            renderInput={params => <TextField {...params} value={findValue} label="Sort" />}
        />
    );
};

export default Sort;
