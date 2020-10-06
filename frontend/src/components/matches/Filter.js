import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateFilter, resetFilter } from "../../actions/match";

import MultipleSelect from "../common/matchGallery/MultipleSelect";
import Switches from "../common/matchGallery/Switch";
import RangeSlider from "../common/matchGallery/Slider";
import Switch from '@material-ui/core/Switch';

import Button from '@material-ui/core/Button';
import Match from "../common/matchGallery/GetMatches";

const Filter = ({updateFilter, resetFilter, match: { filter }}) => {
    const [filterIsOn, setFilter] = React.useState(0);
    const orientation = ["gay", "lesbian", "straight woman", "straight man", "bi"];
    const tags = ['Cooking', 'Art', 'Games'];
    console.log("FILTER component");

    const countries = ["Finland", "Estonia", "Brazil"];
    useEffect(() => {
        updateFilter(filter);
    }, [updateFilter, filter]);

    const handleChange = (event) => {
        console.log("HANDLE CHANGE");
        updateFilter({...filter, [event.target.name]: event.target.checked});
    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log("HANDLE cLICK");
        // updateFilter({...filter});
        setFilter(filterIsOn + 1);
    };

    const handleClickReset = (e) => {
        e.preventDefault();
        console.log("HANDLE cLICK");
        resetFilter();
    };
    
    return (
        <>
            <Switch
                checked={filter.believe_cn}
                onChange={handleChange}
                color="primary"
                name="believe_cn"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <Switch
                checked={filter.believe_west}
                onChange={handleChange}
                color="primary"
                name="believe_west"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            
            <RangeSlider title="Distance 0 - 20,020 km" min={0} max={20020}>SLider</RangeSlider>
            <RangeSlider title="Age 18 - 120" min={18} max={120}>SLider</RangeSlider>
            <RangeSlider title="Fame rating 0 - 5" min={0} max={5}>SLider</RangeSlider>
            {/* <MultipleSelect names={countries}>Country</MultipleSelect> */}
            {/* <MultipleSelect names={tags} title="Interests">Interests</MultipleSelect> */}
            {/* <MultipleSelect names={orientation}>Sex orintation</MultipleSelect> */}
            <Button variant="contained" color="primary" onClick={handleClick}>See results</Button>
            <Button variant="contained" color="primary" onClick={handleClickReset}>Reset</Button>
            <Match route="/match/search" filterIsOn={filterIsOn}/>
        </>
    );
}

Filter.propTypes = {
    updateFilter: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match,
});

export default connect(mapStateToProps, { updateFilter, resetFilter })(Filter);