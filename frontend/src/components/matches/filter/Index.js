import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import { Button, Collapse, Grid, IconButton, Box } from '@material-ui/core';
import { HighlightOff, ExpandMore, SyncAlt } from '@material-ui/icons';

import { updateFilter, resetFilter } from '../../../actions/match';
import GetMatches from '../../common/matchGallery/GetMatches';
import Sort from './Sort';
import Row from './Row';

import { filterStyles } from '../../../styles/filterStyles';
import { useStyles } from '../../../styles/custom';

const Filter = ({ setting }) => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.match);

    const [filterIsOn, setFilter] = React.useState(1);

    useEffect(() => {
        dispatch(updateFilter(filter));
    }, [dispatch, filter]);

    // const handleClickReset = () => () => {
    //     console.log("handle click");
    //     dispatch(resetFilter());
    //     setFilter(0);
    // };
    const handleClickReset = (e) => {
        dispatch(resetFilter());
        setFilter(0);
    };

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

                        {filterIsOn > 1 && (
                            <IconButton
                                onClick={() => {
                                    handleClickReset();
                                }}
                                onClick={() => {
                                    handleClickReset();
                                }}
                                size="small"
                                style={{ padding: 0 }}>
                                <HighlightOff style={{ color: 'white' }} />
                            </IconButton>
                        )}
                        <IconButton
                            className={clsx(classesFilter.expand, {
                                [classesFilter.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
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
                    <Row row={1} />
                    <Row row={2} />
                    <Row row={3} />
                    <Grid item xs={12} container spacing={3} className={classesFilter.row}>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={(e) => {
                                setFilter(filterIsOn + 1);
                            }}
                            
                            className={classesCustom.customButton}>
                            See results
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            // onClick={handleClickReset}
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
