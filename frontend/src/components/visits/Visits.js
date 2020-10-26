import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box,
    Container,
    Grid
} from "@material-ui/core";
import Match from "../common/matchGallery/GetMatches";
import {
    getNotifications,
    updateNotifications,
} from "../../actions/notifications";

const Visits = ({
    match,
    history,
    socket,
    getNotifications,
    updateNotifications,
    notifications,
}) => {
    const { page } = match.params;

    const indexToTabName = ["allvisits", "myvisits"];

    const [selectedTab, setValue] = useState(indexToTabName.indexOf(page));
    const [newVisit, setNewVisit] = useState(false);

    useEffect(() => {
        let isMounted = true;
        socket.on("UPDATE_NOTIFICATIONS", (type) => {
            if (isMounted && type === "visit") {
                setNewVisit(true);
            }
        });
        if (page === "allvisits") {
            setNewVisit(false);
            updateNotifications("visit");
        }
        updateNotifications("visit");
        return () => {
            isMounted = false;
        };
    }, [updateNotifications, socket, page]);

    const handleChange = (event, newValue) => {
        history.push(`/visits/${indexToTabName[newValue]}`);
        setValue(newValue);
    };

    return (
        <div>
            <AppBar color="secondary" position="static">
            <Container>
                <Box p={2} justifyContent="center">
                    <Typography variant="h6">Visit History</Typography>
                    {newVisit && (
                        <Typography>
                            You have new visits, refresh the page
                        </Typography>
                    )}
                </Box>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="All visits" />
                    <Tab label="My visits" />
                </Tabs>
            </Container>
            </AppBar>
            <Container>
                {selectedTab === 0 && (
                    <Box p={3}>
                        <Match route="/match/visitedMe" filterIsOn={0} />
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box p={3}>
                        <Match route="/match/visitedByMe" filterIsOn={0} />
                    </Box>
                )}
            </Container>
            
        </div>
    );
};

Visits.propTypes = {
    getNotifications: PropTypes.func.isRequired,
    updateNotifications: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    notifications: state.notifications,
});

export default connect(mapStateToProps, {
    updateNotifications,
    getNotifications,
})(Visits);
