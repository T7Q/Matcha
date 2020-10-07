import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Container } from '@material-ui/core';
import Box from "@material-ui/core/Box";
import { Search, Whatshot, Favorite, PersonPin, Help, Loyalty, QueryBuilder } from '@material-ui/icons';

import Match from "../common/matchGallery/GetMatches";
import Filter from "./Filter";
import { resetFilter } from "../../actions/match";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
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
        "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
}

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         width: "100%",
//         backgroundColor: theme.palette.background.default,
//     },
// }));

const Matches = ({ resetFilter, match, history}) => {
 
    const { page } = match.params;

    // console.log("components/matches");
    // console.log("PAGE", page, "history", history);
    const route = "/match/" + page;

    // export default function ScrollableTabsButtonForce({ page, history }) {
    const tabNameToIndex = {
        0: "recommend",
        1: "search",
        2: "online",
        3: "new",
        4: "popular",
        5: "random",
        6: "nearby",
    };

    const indexToTabName = {
        recommend: 0,
        search: 1,
        online: 2,
        new: 3,
        popular: 4,
        random: 5,
        nearby: 6,
    };


    const [value, setValue] = React.useState(indexToTabName[page]);

    const handleChange = (event, newValue) => {
        history.push(`/matches/${tabNameToIndex[newValue]}`);
        setValue(newValue);
    };

    return (
        <Container fixed>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab
                        label="Recommended"
                        icon={<Favorite />}
                        {...a11yProps(0)}
                    />
                    <Tab
                        label="Search"
                        icon={<Search />}
                        {...a11yProps(1)}
                    />
                    <Tab
                        label="Online"
                        icon={<QueryBuilder />}
                        {...a11yProps(2)}
                    />
                    <Tab
                        label="New People"
                        icon={<Loyalty />}
                        {...a11yProps(3)}
                    />
                    <Tab
                        label="Popular"
                        icon={<Whatshot />}
                        {...a11yProps(4)}
                    />
                    <Tab label="Random" icon={<Help />} {...a11yProps(5)} />
                    <Tab
                        label="Nearby"
                        icon={<PersonPin />}
                        {...a11yProps(6)}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {/* {resetFilter()} */}
                <span>Sort </span>
                Filter <Filter route={route} setting={false}></Filter>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* {resetFilter()} */}
                <span>Sort </span>
                Filter <Filter route={route} setting={true}></Filter>
            </TabPanel>
            {value > 1 && value < 7 && (
                <TabPanel value={value} index={value}>
                    <Match route={route} filterIsOn={1} />
                </TabPanel>
            )}
        </Container>
    );
};


// export default Matches;

Matches.propTypes = {
    resetFilter: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => ({
//     match: state.match,
// });

export default connect(null, {
    resetFilter,
})(Matches);