import React from 'react';

import { Grid } from '@material-ui/core';

import Toggle from './Toggle';
import Country from './Country';
import CustomSlider from './CustomSlider';
import Orientation from './Orientation';
import Tags from './Tags';
import { filterStyles } from '../../../styles/filterStyles';

const Row = ({ row }) => {
    const classesFilter = filterStyles();
    const rows = [
        [
            { item: <Toggle name="believe_west" labelText="Western" /> },
            { item: <Toggle name="believe_cn" labelText="Chinese" /> },
        ],
        [
            { item: <CustomSlider type="distance" /> },
            { item: <CustomSlider type="fame" /> },
            { item: <CustomSlider type="age" /> },
        ],
        [
            { item: <Orientation /> },
            { item: <Country /> },
            { item: <Tags /> },
        ],
    ]
    
    return (
        <Grid item xs={12} container spacing={3} className={classesFilter.row}>
            {rows[row -1].map((value, i) => {
                return (
                    <Grid item xs={12} sm={4} md={3} key={`row ${row} ${i}`}>
                        {value.item} 
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Row;
