import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { updateFilter } from '../../../actions/match';

const Orientation = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);
    
    const orientation = [
        { label: "men interested in man", db: "gay" },
        { label: "women interested in woman", db: "lesbian" },
        { label: "women interested in man", db: "straight_woman" },
        { label: "men interested in woman", db: "straight_man" },
        { label: "women interested in woman and man", db: "bi_woman" },
        { label: "men interested in woman and man", db: "bi_man" },
    ];
    
    const initial =  orientation.find(n => n.db === "gay");
    const initialValue =  initial.label ;
    // console.log("initial", initial);
    // console.log("value", initialValue);
    // const [formData, setFormData] = useState(initialValue);
    const [formData, setFormData] = useState("men interested in man");
    // console.log("FORM DATA", formData);

    const handleOrientationChange = (event, newValue) => {
        let value = "";
        if (newValue !== null) {
            value = newValue.db;
            console.log("handle change", newValue.label);
            setFormData(newValue);
        } else {
            console.log("reset form");
            setFormData("");
        }
        dispatch(updateFilter({
            ...filter,
            sex_orientation: value,
        }));
    };
    return (
        <Autocomplete
            id="combo-box-demo"
            onChange={handleOrientationChange}
            options={orientation}
            getOptionLabel={(option) => option.label}
            // value={formData}
            getOptionSelected={(option) => option}
            renderInput={(params) => (
                <TextField {...params} label="I'm looking for ..." />
            )}
        />
    );
};

export default Orientation;
