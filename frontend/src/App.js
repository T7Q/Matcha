import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import io from 'socket.io-client';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, CssBaseline } from '@material-ui/core';

import setAuthToken from './utils/setAuthToken';
import { loadUser, loadSocket } from './actions/auth';
import store from './store';

import Navbar from './components/layout/Navbar/';
import Footer from './components/layout/Footer';
import Background from './components/layout/Background';
import CustomizedSnackbars from './components/common/CustomizedSnackbars';
import theme from './styles/theme';
import './App.css';

const App = () => {
    useEffect(() => {
        const socket = io();
        setAuthToken(localStorage.getItem('token'));
        store.dispatch(loadUser());
        store.dispatch(loadSocket(socket));

        return () => {
            socket.close();
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <CssBaseline />
                    <Box
                        display="flex"
                        flexDirection="column"
                        minHeight="100vh"
                        position="relative">
                        <Navbar />
                        <CustomizedSnackbars />
                        <Background />
                        <Footer />
                    </Box>
                </Router>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
