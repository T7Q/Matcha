import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Button, Collapse, Grid, IconButton } from '@material-ui/core';
import { makeStyles, Box } from '@material-ui/core';

import { HighlightOff, ExpandMore, SyncAlt } from '@material-ui/icons';

import { updateFilter, resetFilter } from '../../../actions/match';
import GetMatches from '../../common/matchGallery/GetMatches';
import Toggle from './Toggle';
import Country from './Country';
import CustomSlider from './CustomSlider';
import Orientation from './Orientation';
import Tags from './Tags';
import Sort from './Sort';

import { filterStyles } from '../../../styles/filterStyles';
import { useStyles } from '../../../styles/custom';

const localStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.default,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Filter = ({ route, setting }) => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);

    const [filterIsOn, setFilter] = React.useState(1);

    useEffect(() => {
        dispatch(updateFilter(filter));
    }, [dispatch, filter]);

    const handleClickReset = (e) => {
        dispatch(resetFilter());
        setFilter(0);
    };

    const classes = localStyles();
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
                // spacing={2}
                direction="row"
                justify="space-between"
                alignItems="flex-end"
                pb={4}>
                <Grid item xs={6} sm={3}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            className={classesFilter.filter}
                            startIcon={<SyncAlt style={{ marginRight: 0 }} />}
                            disabled>
                            Filter&emsp;&emsp;
                        </Button>

                        {filterIsOn > 1 ? (
                            <IconButton
                                onClick={() => {
                                    handleClickReset();
                                }}
                                aria-label="close"
                                size="small"
                                style={{ padding: 0 }}>
                                <HighlightOff style={{ color: 'white' }} />
                            </IconButton>
                        ) : (
                            ''
                        )}
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            style={{ padding: 0, margin: 0 }}>
                            <ExpandMore style={{ color: 'white' }} />
                        </IconButton>
                        {/* <Divider
                            style={{
                                // backgroundColor: "#10183c",
                                backgroundColor: "red",
                                width: "100px",
                                position: "absolute",
                            }}
                        /> */}
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Sort
                        setFilter={setFilter}
                        filterIsOn={filterIsOn}
                        className={classesFilter.filter}
                    />
                </Grid>
            </Grid>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid
                        item
                        xs={12}
                        container
                        spacing={3}
                        justify="center"
                        alignItems="center"
                        style={{ marginTop: '10px' }}>
                        <Grid item xs={12} sm={4} md={3}>
                            <Toggle name="believe_west" labelText="Western" />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Toggle name="believe_cn" labelText="Chinese" />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        spacing={3}
                        justify="center"
                        alignItems="center"
                        style={{ marginTop: '10px' }}>
                        <Grid item xs={12} sm={4} md={3}>
                            <CustomSlider type="distance" />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <CustomSlider type="fame" />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <CustomSlider type="age" />
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        container
                        spacing={3}
                        justify="center"
                        alignItems="center"
                        style={{ marginTop: '10px' }}>
                        <Grid item xs={12} sm={4} md={3}>
                            <Orientation />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Country />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Tags />
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
                        style={{ marginTop: '10px' }}>
                        <Button
                            id="filterBtn"
                            size="small"
                            variant="contained"
                            onClick={(e) => {
                                setFilter(filterIsOn + 1);
                            }}
                            className={classesCustom.customButton}>
                            See results
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                                handleClickReset();
                            }}
                            className={classesCustom.customTransparentButton}>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Collapse>
            <GetMatches route="/match/filter" filterIsOn={filterIsOn} />
        </>
    );
};

export default Filter;
