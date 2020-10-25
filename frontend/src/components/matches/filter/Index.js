import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import { Button, Collapse, Grid, IconButton } from "@material-ui/core";
import { makeStyles, Box, Divider } from "@material-ui/core";

import { HighlightOff, ExpandMore, SyncAlt } from "@material-ui/icons";

import { updateFilter, resetFilter } from "../../../actions/match";
import Match from "../../common/matchGallery/GetMatches";
import Toggle from "./Toggle";
import Country from "./Country";
import CustomSlider from "./CustomSlider";
import Orientation from "./Orientation";
import Tags from "./Tags";
import Sort from "./Sort";

import { filterStyles } from "../../../styles/filterStyles";
import { useStyles } from "../../../styles/custom";
import { useTheme } from "@material-ui/core/styles";

const localStyles = makeStyles((theme) => ({
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
    const [filterIsOn, setFilter] = React.useState(1);

    useEffect(() => {
        updateFilter(filter);
    }, [updateFilter, filter]);

    const handleClickReset = (e) => {
        resetFilter();
        setFilter(0);
    };

    const classes = localStyles();
    const theme = useTheme();
    const classesCustom = useStyles();
    const classesFilter = filterStyles();
    const [expanded, setExpanded] = React.useState(setting);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Grid
                container
                // spacing={4}
                direction="row"
                alignItems="flex-end"
                justify="center"
                pb={4}
            >
                <Grid item xs={6} sm={3}>
                    <Box>
                        <Button
                            variant="contained"
                            className={classesFilter.filter}
                            startIcon={<SyncAlt />}
                            disabled
                        >
                            Filter&emsp;&emsp;
                        </Button>

                        {filterIsOn > 1 ? (
                            <IconButton
                                onClick={() => {
                                    handleClickReset();
                                }}
                                aria-label="close"
                                size="small"
                                style={{ padding: 0 }}
                            >
                                <HighlightOff style={{ color: "white" }} />
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
                            style={{ padding: 0 }}
                        >
                            <ExpandMore style={{ color: "white" }} />
                        </IconButton>
                        <Divider
                            style={{
                                backgroundColor: "#10183c",
                                width: "100px",
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Sort
                        updateFilter={updateFilter}
                        setFilter={setFilter}
                        filterIsOn={filterIsOn}
                        filter={filter}
                        className={classesFilter.filter}
                    />
                </Grid>
            </Grid>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        xs={12}
                        container
                        spacing={3}
                        justify="center"
                        alignItems="center"
                        style={{ marginTop: "10px" }}
                    >
                        <Grid item xs={12} sm={4} md={3}>
                            <Toggle
                                name="believe_west"
                                labelText="Western"
                                updateFilter={updateFilter}
                                filter={filter}
                                style={{
                                    borderTopWidth: 1,
                                    borderColor: "red",
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Toggle
                                name="believe_cn"
                                labelText="Chinese"
                                updateFilter={updateFilter}
                                filter={filter}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        spacing={3}
                        justify="center"
                        alignItems="center"
                        style={{ marginTop: "10px" }}
                    >
                        <Grid item xs={12} sm={4} md={3}>
                            <CustomSlider
                                type="distance"
                                updateFilter={updateFilter}
                                filter={filter}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <CustomSlider
                                type="fame"
                                updateFilter={updateFilter}
                                filter={filter}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <CustomSlider
                                type="age"
                                updateFilter={updateFilter}
                                filter={filter}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        container
                        spacing={3}
                        justify="center"
                        alignItems="center"
                        style={{ marginTop: "10px" }}
                    >
                        <Grid item xs={12} sm={4} md={3}>
                            <Orientation
                                updateFilter={updateFilter}
                                filter={filter}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Country
                                updateFilter={updateFilter}
                                filter={filter}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Tags updateFilter={updateFilter} filter={filter} />
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        container
                        spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ marginTop: "10px" }}
                    >
                        <Button
                            id="filterBtn"
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                setFilter(filterIsOn + 1);
                            }}
                            className={classesCustom.customButton}
                        >
                            See results
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() => {
                                handleClickReset();
                            }}
                            className={classesCustom.customTransparentButton}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Collapse>
            <Match route="/match/filter" filterIsOn={filterIsOn} />
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
