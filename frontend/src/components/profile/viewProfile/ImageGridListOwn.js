import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Box, GridList, GridListTile } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { setSnackbar } from '../../../actions/setsnackbar';
import { getProfile } from '../../../actions/profile';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        // height: 450,
    },
}));
const ImageGridListOwn = ({ profile, getProfile, setSnackbar, handleClose }) => {
    const temp = [...profile.photos];
    const classes = useStyles();

    let isProfileHere = false;

    for (let element of temp) {
        if (element.type === 'profile') {
            isProfileHere = true;
        }
    }
    while (temp.length < 5) {
        temp.push({ image_path: '', old_image_id: '', type: '', data: '' });
    }

    if (isProfileHere) {
        temp.map(element => {
            if (element.type === '') {
                element.type = 'photo';
            }
            return element;
        });
    } else {
        let i = 0;
        temp.map((element, index) => {
            if (element.type === '' && i === 0) {
                element.type = 'profile';
                i = 1;
            } else if (element.type === '') {
                element.type = 'photo';
            }
            return element;
        });
    }

    const [images, setImages] = useState(temp);

    const onFileToBase64 = (file, index) => {
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            const copied = [...images];
            copied[index].data = event.target.result;
            setImages(copied);
        };
    };

    const handleUpload = (upload, index) => {
        if (upload.length > 0) {
            onFileToBase64(upload[0], index);
        } else {
            const copied = [...images];
            copied[index].data = '';
            setImages(copied);
        }
    };

    const save = async () => {
        try {
            const res = await axios.post('/profile/uploadphoto', { key: 'photo', value: images });
            if (res.data.error) {
                setSnackbar(true, 'error', 'Try again later');
            } else {
                setSnackbar(true, 'success', 'Successfully updated');
                handleClose();
                getProfile('myProfile', profile.user_id);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box textAlign="center">
            {/* <GridList className={classes.gridList} cols={2}> */}
            {temp.map((tile, index) => {
                const initial = tile.image_path !== '' ? [tile.image_path] : [];
                const text = tile.type === 'profile' ? 'Profile photo' : '';
                return (
                    <DropzoneArea
                        key={index}
                        acceptedFiles={['image/*']}
                        onChange={upload => handleUpload(upload, index)}
                        initialFiles={initial}
                        dropzoneText={text}
                        showAlerts={false}
                        filesLimit={1}
                    />
                );
            })}
            {/* </GridList> */}
            <Button variant="contained" color="primary" onClick={save}>
                Save
            </Button>
        </Box>
    );
};

ImageGridListOwn.propTypes = {
    getProfile: PropTypes.func.isRequired,
    setSnackbar: PropTypes.func.isRequired,
};

export default connect(null, { getProfile, setSnackbar })(ImageGridListOwn);
