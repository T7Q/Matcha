import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider, Typography } from '@material-ui/core';
import { updateFilter } from '../../../actions/match';

function valuetext(value) {
    return `${value}`;
}

const CustomSlider = ({ type }) => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);

    const handleDistanceChange = (event, newValue) => {
        dispatch(
            updateFilter({
                ...filter,
                min_distance: newValue[0],
                max_distance: newValue[1],
            })
        );
    };
    const handleFameChange = (event, newValue) => {
        dispatch(
            updateFilter({
                ...filter,
                min_fame: newValue[0],
                max_fame: newValue[1],
            })
        );
    };
    const handleAgeChange = (event, newValue) => {
        dispatch(
            updateFilter({
                ...filter,
                min_age: newValue[0],
                max_age: newValue[1],
            })
        );
    };
    const data = {
        distance: {
            title: 'Distance 0 - 20,000 km',
            defaultMin: 0,
            defaultMax: 20000,
            valueMin: filter.min_distance,
            valueMax: filter.max_distance,
            handleChange: handleDistanceChange,
        },
        fame: {
            title: 'Fame 0 - 5',
            defaultMin: 0,
            defaultMax: 5,
            valueMin: filter.min_fame,
            valueMax: filter.max_fame,
            handleChange: handleFameChange,
        },
        age: {
            title: 'Age 18 - 120',
            defaultMin: 18,
            defaultMax: 120,
            valueMin: filter.min_age,
            valueMax: filter.max_age,
            handleChange: handleAgeChange,
        },
    };
    return (
        <>
            <Typography id="range-slider" variant="body1" color="textSecondary" gutterBottom>
                {data[type].title}
            </Typography>
            <Slider
                min={data[type].defaultMin}
                max={data[type].defaultMax}
                value={[data[type].valueMin, data[type].valueMax]}
                onChange={data[type].handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </>
    );
};

export default CustomSlider;
