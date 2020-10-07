import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { useStyles } from '../../../styles/custom';
import { deleteAction } from '../../../actions/profile';

const DeleteAccount = ({ deleteAction, history }) => {
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteAccount = () => {
        deleteAction(history);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box m={{ xs: 2, sm: 0 }} mr={{ sm: 6 }} textAlign="center">
                <Typography variant="h6">When you delete your account, everything is permanently gone.</Typography>
                <Typography variant="h6">Your account will no longer appear to other people on Matcha.</Typography>
                <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    color="primary"
                    className={`${classes.customButton} ${classes.p2}`}>
                    Delete
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle id="alert-dialog-title">Are you sure you want to delete account?</DialogTitle>
                    <DialogContent>You can't undo this action</DialogContent>
                    <DialogActions>
                        <Button onClick={deleteAccount} variant="contained">
                            Delete
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </form>
    );
};

DeleteAccount.propTypes = {
    deleteAction: PropTypes.func.isRequired,
};

export default connect(null, { deleteAction })(withRouter(DeleteAccount));
