import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import HelpIcon from '@material-ui/icons/Help';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RoomIcon from '@material-ui/icons/Room';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LooksIcon from '@material-ui/icons/Looks';
import Match from './Matches';
import Gallery from "./Gallery";

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
          <Typography>{children}</Typography>
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HeaderScrollableTabs({ match, iEnd}) {
  // console.log("props", props);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Recommended" icon={<FavoriteIcon />} {...a11yProps(0)} />
          <Tab label="Search" icon={<SearchIcon />} {...a11yProps(1)} />
          <Tab label="Online" icon={<ScheduleIcon />} {...a11yProps(2)} />
          <Tab label="New People" icon={<WbIncandescentIcon />} {...a11yProps(3)} />
          <Tab label="Popular" icon={<WhatshotIcon />} {...a11yProps(4)} />
          <Tab label="Random" icon={<LooksIcon />} {...a11yProps(5)} />
          <Tab label="Nearby" icon={<RoomIcon />} {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
        <Gallery match={match} iEnd={iEnd} type="recommend"/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
        <Gallery match={match} iEnd={iEnd} type="search"/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
        <Gallery match={match} iEnd={iEnd} type="online"/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
        <Gallery match={match} iEnd={iEnd} type=""/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
        <Gallery match={match} iEnd={iEnd} type="popular"/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
        <Gallery match={match} iEnd={iEnd} type="random"/>
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
        <Gallery match={match} iEnd={iEnd} type="nearby"/>
      </TabPanel>
    </div>
  );
}

