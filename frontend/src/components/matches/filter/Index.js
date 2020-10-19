import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import { Button, Collapse, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { HighlightOff, ExpandMore } from "@material-ui/icons";

import { updateFilter, resetFilter } from "../../../actions/match";
import Match from "../../common/matchGallery/GetMatches";
import Toggle from "./Toggle";
import Country from "./Country";
import CustomSlider from "./CustomSlider";
import Orientation from "./Orientation";
import Tags from "./Tags";
import Sort from "./Sort";

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

const Filter = ({
    updateFilter,
    resetFilter,
    match: { filter },
    route,
    setting,
}) => {
    const [filterIsOn, setFilter] = React.useState(0);

    useEffect(() => {
        updateFilter(filter);
    }, [updateFilter, filter]);

    const handleClickReset = (e) => {
        resetFilter();
        setFilter(0);
    };

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(setting);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Sort
                        updateFilter={updateFilter}
                        setFilter={setFilter}
                        filterIsOn={filterIsOn}
                        filter={filter}
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
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <CustomSlider
                            type="distance"
                            updateFilter={updateFilter}
                            filter={filter}
                        />
                        <CustomSlider
                            type="fame"
                            updateFilter={updateFilter}
                            filter={filter}
                        />
                        <CustomSlider
                            type="age"
                            updateFilter={updateFilter}
                            filter={filter}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Country updateFilter={updateFilter} filter={filter} />
                        <Orientation
                            updateFilter={updateFilter}
                            filter={filter}
                        />
                        <Tags updateFilter={updateFilter} filter={filter} />
                    <Grid item xs={6} sm={2} >
                        <Toggle
                            name="believe_west"
                            labelText="Western"
                            updateFilter={updateFilter}
                            filter={filter}
                        />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <Toggle
                            name="believe_cn"
                            labelText="Chinese"
                            updateFilter={updateFilter}
                            filter={filter}
                        />
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
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
