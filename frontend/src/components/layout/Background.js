import React from "react";
import BackgroundImage from "../../background3.jpg";
import { connect } from "react-redux";
import { Grid, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import Circle from "./Circle";

import CustomRouter from "../routing/CustomRouter";

const style = {
    background: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
};

const Background = ({ isAuthenticated }) => {
    if (isAuthenticated)
        return (
            <Box flexGrow={1}>
                <Grid style={{ minHeight: "80vh" }} container>
                    <CustomRouter />
                    <Circle />
                </Grid>
            </Box>
        );
    else {
        return (
            <Box flexGrow={1} style={style.background}>
                <Grid style={{ minHeight: "80vh" }} container>
                    <CustomRouter />
                    <Circle />
                </Grid>
            </Box>
        );
    }
};

Background.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Background);
