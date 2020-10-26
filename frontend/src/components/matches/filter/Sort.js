import React from 'react';

<<<<<<< HEAD
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
=======

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { filterStyles } from "../../../styles/filterStyles";

>>>>>>> 59d9de3f714b8f6b421664d51751e3cef5245e70

const Sort = ({ updateFilter, setFilter, filterIsOn, filter }) => {
    const classesFilter = filterStyles();
    const sort = [
<<<<<<< HEAD
        { label: 'Yongest', db: 'age_asc' },
        { label: 'Oldest', db: 'age_desc' },
        { label: 'Best rating', db: 'fame_desc' },
        { label: 'Lowest rating', db: 'fame_asc' },
        { label: 'Closest', db: 'distance_asc' },
        { label: 'Furtherst away', db: 'distance_desc' },
        { label: 'Most interest in common', db: 'commonTag_desc' },
        { label: 'Least interest in common', db: 'commonTag_asc' },
=======

        { label: "Yongest First", db: "age_asc" },
        { label: "Oldest first", db: "age_desc" },
        { label: "Best rating", db: "fame_desc" },
        { label: "Lowest rating", db: "fame_asc" },
        { label: "Closest", db: "distance_asc" },
        { label: "Furtherst away", db: "distance_desc" },
        { label: "Most common interest", db: "commonTag_desc" },
        { label: "Least common interest", db: "commonTag_asc" },

>>>>>>> 59d9de3f714b8f6b421664d51751e3cef5245e70
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
<<<<<<< HEAD
            getOptionLabel={option => option.label}
            getOptionSelected={option => option}
            renderInput={params => <TextField {...params} value={findValue} label="Sort" />}
=======

            getOptionLabel={(option) => option.label}
            getOptionSelected={(option) => option}
            className={classesFilter.sort}
            renderInput={(params) => <TextField {...params} value={findValue} label="Sort" 
            />}

>>>>>>> 59d9de3f714b8f6b421664d51751e3cef5245e70
        />
    );
};

export default Sort;
