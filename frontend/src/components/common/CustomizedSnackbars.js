import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setSnackbar } from "../../actions/setsnackbar";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

const  CustomizedSnackbars = ({ setSnackbar, snackbar }) => {
    const classes = useStyles();
    const snackbarOpen = snackbar.snackbarOpen;
    const snackbarType = snackbar.snackbarType;
    const snackbarMessage = snackbar.snackbarMessage;
    
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar(false, "success", "");
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    elevation={6}
                    variant="filled"
                    color={snackbarType}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
CustomizedSnackbars.propTypes = {
    setSnackbar: PropTypes.func.isRequired,
    snackbar: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    snackbar: state.snackbar,
});

export default connect(mapStateToProps, { setSnackbar })(CustomizedSnackbars);
