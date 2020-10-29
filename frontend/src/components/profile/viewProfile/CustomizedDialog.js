import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import ImageGridList from './ImageGridList';
import ImageGridListOwn from './ImageGridListOwn';
import { profileStyles } from '../../../styles/profileStyles';

export default function CustomizedDialog({ open, setOpen, profile, type }) {
    const classes = profileStyles();
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle disableTypography className={classes.dialog}>
                    {open && (
                        <IconButton
                            aria-label="close"
                            className={classes.closeButton}
                            onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    )}
                </DialogTitle>
                <DialogContent dividers>
                    {type === 'myProfile' ? (
                        <ImageGridListOwn handleClose={handleClose} profile={profile} />
                    ) : (
                        <ImageGridList profile={profile} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
