import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import clsx from "clsx";
import { getCountries } from 'countries-cities';
// https://www.npmjs.com/package/country-city
import {
    Button,
    Collapse,
    Grid,
    IconButton,
    makeStyles,
    Slider,
    Switch,
    TextField,
    Typography,
} from "@material-ui/core";

import { HighlightOff, ExpandMore } from "@material-ui/icons";

import { updateFilter, resetFilter } from "../../actions/match";
import Match from "../common/matchGallery/GetMatches";

import Autocomplete from "@material-ui/lab/Autocomplete";




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


    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
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
    const orientation = [
        "Gay",
        "Lesbian",
        "Straight woman",
        "Straight man",
        "Bi",
    ];
    const sort = [
        "Yongest" ,
        "Oldest" ,
        "Best rating" ,
        "Lowest rating" ,
        "Closest" ,
        "Furtherst away" ,
        "Most interest in common" ,
        "Least interest in common" ,
    ];
    // console.log("FILTER component");
   
    const countries = getCountries();
    // let cities = [];

    // for (const element of countries ){
    //     cities = cities.concat(getCities(element));
    // };
    // console.log("cities", cities);
    // console.log("cities", countries);


    useEffect(() => {
        updateFilter(filter);
    }, [updateFilter, filter]);

    const [realTags, setRealTags] = useState([]);
    useEffect(() => {
        let isMounted = true;
        async function getTags() {
            const res = await axios.get("/profile/tags");
            isMounted && setRealTags(res.data);
        }
        getTags();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleChange = (event) => {
        updateFilter({ ...filter, [event.target.name]: event.target.checked });
    };

    const handleClickReset = (e) => {
        resetFilter();
        setFilter(0);
    };

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(setting);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDistanceChange = (event, newValue) => {
        updateFilter({
            ...filter,
            min_distance: newValue[0],
            max_distance: newValue[1],
        });
    };

    const handleFameChange = (event, newValue) => {
        updateFilter({
            ...filter,
            min_fame: newValue[0],
            max_fame: newValue[1],
        });
    };
    const handleInterestChange = (event, newValue) => {
        let selectedTags = [];
        if (newValue.length !== 0) {
            const temp = Object.entries(newValue);
            temp.forEach(([key, value]) => {
                selectedTags.push(value.tag);
            });
        }
        updateFilter({
            ...filter,
            tags: selectedTags,
        });
    };
    const handleOrientationChange = (event, newValue) => {
        let value = "";
        if (newValue !== null) {
            value = newValue.replace(/\s+/g, "_").toLowerCase();
        }
        updateFilter({
            ...filter,
            sex_orientation: value,
        });
    };
    const handleCountryChange = (event, newValue) => {
        let value = "";
        // cities = [];
        // console.log("input", newValue);
        if (newValue !== null) {
            value = newValue;
            // for (const element of newValue ){
            //     cities = cities.concat(getCities(element));
            // };
            // console.log("cities", cities);
            // console.log("cities", getCities("Finland"));
            // console.log("cities", getCities(newValue[0]));
        }
        updateFilter({
            ...filter,
            country: value,
        });
    };
    const handleSortChange = (event, newValue) => {
        let value = [];
        const options = {
            Yongest:  "age_asc",
            Oldest: "age_desc",
            Best_rating: "fame_desc",
            Lowest_rating: "fame_asc",
            Closest: "distance_asc",
            Furtherst_away: "distance_desc",
            Most_interest_in_common: "commonTag_desc" ,
            Least_interest_in_common: "commonTag_asc",
        }
        // console.log("input", newValue);
        if (newValue !== null) {
            const temp = newValue.replace(/\s+/g, "_");
            value[0] = options[temp];
        }
        updateFilter({
            ...filter,
            order: value,
        });
        document.getElementById("filterBtn").click();
    };

    return (
        <>
            <Grid container spacing={2}>
            <Grid item xs={3}>
            <Autocomplete
                            id="combo-sort"
                            onChange={handleSortChange}
                            options={sort}
                            getOptionLabel={(option) => option}
                            getOptionSelected={(option) => option}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Sort"
                                />
                            )}
                        />
            </Grid>
            <Grid item xs={3}>
            Filter
            {filterIsOn > 0 ? (
                <IconButton
                    onClick={() => {
                        handleClickReset();
                    }}
                    aria-label="close"
                    size="small"
                >
                    <HighlightOff color="primary" />
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
                <ExpandMore color="primary" />
            </IconButton>

            </Grid>
            </Grid>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography id="range-slider" gutterBottom>
                            Age 18 - 120
                        </Typography>
                        <Slider
                            min={18}
                            max={120}
                            value={[filter.min_age, filter.max_age]}
                            onChange={(event, newValue) => {
                                updateFilter({
                                    ...filter,
                                    min_age: newValue[0],
                                    max_age: newValue[1],
                                });
                            }}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                        />
                        <Typography id="range-slider" gutterBottom>
                            Distance 0 - 200,000 km
                        </Typography>
                        <Slider
                            min={0}
                            max={200000}
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
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            multiple
                            limitTags={2}
                            id="interest-standard"
                            onChange={handleInterestChange}
                            options={realTags}
                            getOptionLabel={(option) => option.tag}
                            defaultValue={[]}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Interests"
                                    placeholder="Interests"
                                />
                            )}
                        />
                        <Autocomplete
                            id="combo-box-demo"
                            onChange={handleOrientationChange}
                            options={orientation}
                            getOptionLabel={(option) => option}
                            getOptionSelected={(option) => option}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="I'm looking for"
                                />
                            )}
                        />


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


<Autocomplete
                            multiple
                            limitTags={2}
                            id="country-standard"
                            onChange={handleCountryChange}
                            options={countries}
                            getOptionLabel={(option) => option}
                            defaultValue={[]}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Country"
                                    placeholder="Country"
                                />
                            )}
                        />
{/* <Autocomplete
                            multiple
                            limitTags={2}
                            id="tags-standard"
                            // onChange={handleCityChange}
                            options={cities}
                            getOptionLabel={(option) => option}
                            defaultValue={[]}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="City"
                                    placeholder="City"
                                />
                            )}
                        /> */}





                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Button
                            id="filterBtn"
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                setFilter(filterIsOn + 1);
                            }}
                        >
                            See results
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                handleClickReset();
                            }}
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
