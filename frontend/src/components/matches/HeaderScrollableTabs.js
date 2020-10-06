import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import Match from "../common/matchGallery/GetMatches";

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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.default,
    },
}));

export default function ScrollableTabsButtonForce({ page, history }) {
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

    const classes = useStyles();
    const [value, setValue] = React.useState(indexToTabName[page]);

    const handleChange = (event, newValue) => {
        history.push(`/matches/${tabNameToIndex[newValue]}`);
        setValue(newValue);
    };

    const route = "/matches/" + page;
    return (
        <div className={classes.root}>
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
                        icon={<FavoriteIcon />}
                        {...a11yProps(0)}
                    />
                    <Tab
                        label="Search"
                        icon={<SearchIcon />}
                        {...a11yProps(1)}
                    />
                    <Tab
                        label="Online"
                        icon={<QueryBuilderIcon />}
                        {...a11yProps(2)}
                    />
                    <Tab
                        label="New People"
                        icon={<LoyaltyIcon />}
                        {...a11yProps(3)}
                    />
                    <Tab
                        label="Popular"
                        icon={<WhatshotIcon />}
                        {...a11yProps(4)}
                    />
                    <Tab label="Random" icon={<HelpIcon />} {...a11yProps(5)} />
                    <Tab
                        label="Nearby"
                        icon={<PersonPinIcon />}
                        {...a11yProps(6)}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Match route="/match/recommend" filterIsOn={0}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* <Match route="/match/search" filterIsOn={1}/> */}
                FILTER HERE
            </TabPanel>
            {value > 1 && value < 7 && (
                <TabPanel value={value} index={value}>
                    <Match route={route} filterIsOn={1} />
                </TabPanel>
            )}
        </div>
    );
}
