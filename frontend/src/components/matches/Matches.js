import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { AppBar, Tabs, Tab, Container, Box } from "@material-ui/core";
import {
    Search,
    Whatshot,
    Favorite,
    PersonPin,
    Help,
    Loyalty,
    QueryBuilder,
    WbIncandescent
} from "@material-ui/icons";

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

const Matches = ({ resetFilter, match, history }) => {
    const { page } = match.params;
    const route = "/match/" + page;
    const indexToTabName = [
        "recommend",
        "search",
        "online",
        "new",
        "popular",
        "random",
        "nearby",
    ];
    const [value, setValue] = React.useState(indexToTabName.indexOf(page));

    const handleChange = (event, newValue) => {
        history.push(`/matches/${indexToTabName[newValue]}`);
        setValue(newValue);
        resetFilter();
    };

    return (
        <Box>
            <AppBar color="secondary" position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab
                        label="Recommended"
                        icon={<Favorite />}
                        {...a11yProps(0)}
                    />
                    <Tab label="Search" icon={<Search />} {...a11yProps(1)} />
                    <Tab
                        label="Online"
                        icon={<QueryBuilder />}
                        {...a11yProps(2)}
                    />
                    <Tab
                        label="New People"
                        icon={<WbIncandescent />}
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
            <Container>
                <TabPanel value={value} index={0}>
                    <Filter route={route} setting={false}></Filter>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Filter route={route} setting={true}></Filter>
                </TabPanel>
                {value > 1 && value < 7 && (
                    <TabPanel value={value} index={value}>
                        <Match route={route} filterIsOn={1} />
                    </TabPanel>
                )}
            </Container>
        </Box>
    );
};

Matches.propTypes = {
    resetFilter: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

export default connect(null, {
    resetFilter,
})(Matches);
