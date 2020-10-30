import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppBar, Tabs, Tab, Typography, Box, Container } from '@material-ui/core';

import { updateNotifications } from '../../actions/notifications';
import GetMatches from '../common/matchGallery/GetMatches';

const Visits = ({ socket }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { page } = useParams();

    const indexToTabName = ['allvisits', 'myvisits'];

    if (!indexToTabName.includes(page)) {
        page = 'allvisits';
    }

    const [selectedTab, setValue] = useState(indexToTabName.indexOf(page));
    const [newVisit, setNewVisit] = useState(false);

    useEffect(() => {
        let isMounted = true;
        socket.on('UPDATE_NOTIFICATIONS', (type) => {
            if (isMounted && type === 'visit') {
                setNewVisit(true);
            }
        });
        if (page === 'allvisits') {
            setNewVisit(false);
            dispatch(updateNotifications('visit'));
        }
        dispatch(updateNotifications('visit'));
        return () => {
            isMounted = false;
        };
    }, [dispatch, socket, page]);

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
                        {newVisit && <Typography>You have new visits, refresh the page</Typography>}
                    </Box>
                    <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary">
                        <Tab label="All visits" />
                        <Tab label="My visits" />
                    </Tabs>
                </Container>
            </AppBar>
            <Container>
                {selectedTab === 0 && (
                    <Box p={3}>
                        <GetMatches route="/match/visitedMe" filterIsOn={0} />
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box p={3}>
                        <GetMatches route="/match/visitedByMe" filterIsOn={0} />
                    </Box>
                )}
            </Container>
        </div>
    );
};

export default Visits;
