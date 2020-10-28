import React from "react";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Orientation = ({ updateFilter, filter }) => {
    const orientation = [
        { label: "men interested in man", db: "gay" },
        { label: "women interested in woman", db: "lesbian" },
        { label: "women interested in man", db: "straight_woman" },
        { label: "men interested in woman", db: "straight_man" },
        { label: "women interested in woman and man", db: "bi_woman" },
        { label: "men interested in woman and man", db: "bi_man" },
    ];
    const handleOrientationChange = (event, newValue) => {
        let value = "";
        if (newValue !== null) {
            value = newValue.db;
        }
        updateFilter({
            ...filter,
            sex_orientation: value,
        });
    };
    return (
        <Autocomplete
            id="combo-box-demo"
            onChange={handleOrientationChange}
            options={orientation}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option) => option}
            renderInput={(params) => (
                <TextField {...params} label="I'm looking for ..." />
            )}
        />
    );
};

export default Orientation;
