import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateFilter, resetFilter } from "../../actions/match";

// import MultipleSelect from "../common/matchGallery/MultipleSelect";
import RangeSlider from "../common/matchGallery/Slider";
import Switch from "@material-ui/core/Switch";

import Button from "@material-ui/core/Button";
import Match from "../common/matchGallery/GetMatches";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.default,
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
}));

function valuetext(value) {
    return `${value}`;
  }

const Filter = ({
    updateFilter,
    resetFilter,
    match: { filter },
    route,
    setting,
}) => {
    const [filterIsOn, setFilter] = React.useState(0);
    // const orientation = ["gay", "lesbian", "straight woman", "straight man", "bi"];
    // const tags = ['Cooking', 'Art', 'Games'];
    // console.log("FILTER component");
    // console.log("route", route);
    const countries = ["Finland", "Estonia", "Brazil"];
    useEffect(() => {
        updateFilter(filter);
    }, [updateFilter, filter]);

    const handleChange = (event) => {
        updateFilter({ ...filter, [event.target.name]: event.target.checked });
    };

    const handleClickFilter = (e) => {
        console.log("BUTON CLICK");
        e.preventDefault();
        setFilter(filterIsOn + 1);
    };

    const handleClickReset = (e) => {
        e.preventDefault();
        resetFilter();
        setFilter(0);
    };

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(setting);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [age, setAge] = React.useState([18, 120]);

  const handleAgeChange = (event, newValue) => {
    setAge(newValue);
    updateFilter({ ...filter, min_age: newValue[0], max_age: newValue[1]});

  };
    const [distance, setDistance] = React.useState([0, 200000]);

  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
    updateFilter({ ...filter, min_distance: newValue[0], max_distance: newValue[1]});

  };
    const [fame, setFame] = React.useState([0, 5]);

  const handleFameChange = (event, newValue) => {
    setFame(newValue);
    updateFilter({ ...filter, min_fame: newValue[0], max_fame: newValue[1]});

  };

    // console.log("filterON", filterIsOn, "page", route.split("/")[2]);
    return (
        <>
            {filterIsOn > 0 ? (
                <IconButton
                    onClick={handleClickReset}
                    aria-label="close"
                    size="small"
                >
                    <HighlightOffIcon color="primary" />
                </IconButton>
            ) : (
                ""
            )}
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon color="primary" />
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>

            <Grid container spacing={3}>

            <Grid item xs={6}>

            
                <Switch
                    checked={filter.believe_cn}
                    onChange={handleChange}
                    color="primary"
                    name="believe_cn"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <Switch
                    checked={filter.believe_west}
                    onChange={handleChange}
                    color="primary"
                    name="believe_west"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                />
            </Grid>
            <Grid item xs={6}>
                <Typography id="range-slider" gutterBottom>
                Age 18 - 120
                </Typography>
                <Slider
                    min={18}
                    max={120}
                    value={[filter.min_age, filter.max_age]}
                    onChange={handleAgeChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
                <Typography id="range-slider" gutterBottom>
                Distance 0 - 20,020 km
                </Typography>
                <Slider
                    min={0}
                    max={10000}
                    value={[filter.min_distance, filter.max_distance]}
                    onChange={handleDistanceChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
                <Typography id="range-slider" gutterBottom>
                Fame rating 0 - 5
                </Typography>
                <Slider
                    min={0}
                    max={5}
                    value={[filter.min_fame, filter.max_fame]}
                    onChange={handleFameChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />

                
                <RangeSlider title="Fame rating 0 - 5" min={0} max={5}>
                    SLider
                </RangeSlider>
                {/* <MultipleSelect names={countries}>Country</MultipleSelect> */}
                {/* <MultipleSelect names={tags} title="Interests">Interests</MultipleSelect> */}
                {/* <MultipleSelect names={orientation}>Sex orintation</MultipleSelect> */}
                </Grid>
                </Grid>
                <Grid container >
                <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickFilter}
                >
                    See results
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickReset}
                >
                    Reset
                </Button>
                </Grid>
                </Grid>
                
            </Collapse>
            {filterIsOn === 0 && route.split("/")[2] === "recommend" ? (
                <Match route={route} filterIsOn={0} />
            ) : (
                ""
            )}
            {filterIsOn > 0 ? (
                <Match route="/match/filter" filterIsOn={filterIsOn} />
            ) : (
                ""
            )}
        </>
    );
};

Filter.propTypes = {
    updateFilter: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    setting: PropTypes.bool.isRequired,
    route: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match,
});

export default connect(mapStateToProps, {
    updateFilter,
    resetFilter,
})(Filter);
