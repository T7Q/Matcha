import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import { AppBar, Tabs, Tab, Container, Box } from '@material-ui/core';
import { Search, Whatshot, Favorite, PersonPin } from '@material-ui/icons';
import { Help, QueryBuilder, WbIncandescent } from '@material-ui/icons';

import GetMatches from '../common/matchGallery/GetMatches';
import Filter from './filter/Index';
import { resetFilter } from '../../actions/match';
import { systemStyles } from '../../styles/systemStyles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const Matches = () => {
    const dispatch = useDispatch();
    const { previousPath } = useSelector((state) => state.auth);
    let { page } = useParams();
    const history = useHistory();
    const route = '/match/' + page;
    const indexToTabName = ['recommend', 'search', 'online', 'new', 'popular', 'random', 'nearby'];
    const classes = systemStyles();

    if (!indexToTabName.includes(page)) {
        page = 'recommend';
    }

    const [value, setValue] = React.useState(indexToTabName.indexOf(page));

    const handleChange = (event, newValue) => {
        history.push(`/matches/${indexToTabName[newValue]}`);
        setValue(newValue);
        dispatch(resetFilter());
    };

    useEffect(() => {
        if (previousPath === '') {
            dispatch(resetFilter());
        } else if (previousPath === 'otherUser') {
            dispatch({ type: 'UPDATE_PATH', payload: '' });
        }
    }, []); // eslint-disable-line

    return (
        <Box>
            <AppBar color="secondary" className={classes.py20} position="static">
                <Container>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example">
                        <Tab label="Recommended" icon={<Favorite />} {...a11yProps(0)} />
                        <Tab label="Search" icon={<Search />} {...a11yProps(1)} />
                        <Tab label="Online" icon={<QueryBuilder />} {...a11yProps(2)} />
                        <Tab label="New People" icon={<WbIncandescent />} {...a11yProps(3)} />
                        <Tab label="Popular" icon={<Whatshot />} {...a11yProps(4)} />
                        <Tab label="Random" icon={<Help />} {...a11yProps(5)} />
                        <Tab label="Nearby" icon={<PersonPin />} {...a11yProps(6)} />
                    </Tabs>
                </Container>
            </AppBar>
            <Container>
                <TabPanel value={value} index={0}>
                    <Filter route={route} setting={false}></Filter>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Filter route={route} setting={true}></Filter>
                </TabPanel>
                {value > 1 && value < 7 && (
                    <TabPanel value={value} index={value}>
                        <GetMatches route={route} filterIsOn={1} />
                    </TabPanel>
                )}
            </Container>
        </Box>
    );
};

export default Matches;
