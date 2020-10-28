import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { Button, Box } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { setSnackbar } from '../../../actions/setsnackbar';
import { getProfile } from '../../../actions/profile';

const ImageGridListOwn = ({ profile, handleClose }) => {
    const dispatch = useDispatch();
    const temp = [...profile.photos];

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
        temp.map((element) => {
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
        reader.onload = (event) => {
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
                dispatch(setSnackbar(true, 'error', 'Try again later'));
            } else {
                dispatch(setSnackbar(true, 'success', 'Successfully updated'));
                handleClose();
                dispatch(getProfile('myProfile', profile.user_id));
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box textAlign="center">
            {temp.map((tile, index) => {
                const initial = tile.image_path !== '' ? [tile.image_path] : [];
                const text = tile.type === 'profile' ? 'Profile photo' : '';
                return (
                    <DropzoneArea
                        key={index}
                        acceptedFiles={['image/*']}
                        onChange={(upload) => handleUpload(upload, index)}
                        initialFiles={initial}
                        dropzoneText={text}
                        showAlerts={false}
                        filesLimit={1}
                    />
                );
            })}
            <Button variant="contained" color="primary" onClick={save}>
                Save
            </Button>
        </Box>
    );
};

export default ImageGridListOwn;
