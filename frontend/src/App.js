import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomRouter from './components/routing/CustomRouter';
// import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { theme } from './styles/custom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Circle from './components/layout/Circle';

// setAuthToken(localStorage.getItem('token'));

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <Box display="flex" flexDirection="column" minHeight="100vh" position="relative">
                        <CssBaseline />
                        <Navbar />
                        <Box p={5} m={{ xs: 'auto', lg: '50px' }} flexGrow={1}>
                            <Grid container spacing={1}>
                                <Grid container item sm={12}>
                                    <Box my={5}></Box>
                                </Grid>
                                <CustomRouter />
                                <Circle />
                            </Grid>
                        </Box>
                        <Footer />
                    </Box>
                </Router>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
