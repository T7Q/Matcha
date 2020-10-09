import React from "react";

import {
    Switch,
    // TextField,
    // Typography,
} from "@material-ui/core";

const Toggle = ({ name, updateFilter, filter }) => {
    const handleChange = (event) => {
        updateFilter({ ...filter, [event.target.name]: event.target.checked});
    };
    console.log("name", name);
    console.log("filter", filter);
    console.log("filter[name]", filter[name]);
    return (
        <Switch
            checked={filter[name]}
            onChange={handleChange}
            color="primary"
            name="believe_cn"
            inputProps={{ "aria-label": "secondary checkbox" }}
        />
    );
};

export default Toggle;
