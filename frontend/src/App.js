import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import io from "socket.io-client";
import { ThemeProvider } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Navbar from "./components/layout/Navbar/";
import Footer from "./components/layout/Footer";
// import CustomRouter from "./components/routing/CustomRouter";
import setAuthToken from "./utils/setAuthToken";
import { loadUser, loadSocket } from "./actions/auth";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { theme } from "./styles/custom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
// import Circle from "./components/layout/Circle";
import Background from "./components/layout/Background";
// import BackgroundImage from "./background3.jpg";

import CustomizedSnackbars from "./components/common/CustomizedSnackbars";

// const style = {
//     background: {
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${BackgroundImage})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//     },
// };

const socket = io("http://localhost:5000");

const App = () => {
    useEffect(() => {
        setAuthToken(localStorage.getItem("token"));
        store.dispatch(loadUser());
        store.dispatch(loadSocket(socket));
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
                        position="relative"
                    >
                        <Navbar />
                        <CustomizedSnackbars />
                        <Background/>
                        {/* <Box flexGrow={1}>
                            <Grid style={{ minHeight: "80vh" }} container>
                                <CustomRouter />
                                <Circle />
                            </Grid>
                        </Box> */}
                        <Footer />
                    </Box>
                </Router>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
