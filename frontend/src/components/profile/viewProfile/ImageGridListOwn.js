import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DropzoneArea } from 'material-ui-dropzone';
import { Box } from '@material-ui/core';

import { getProfile, savePhotos } from '../../../actions/profile';
import Button from '../../common/Button';
import { setSnackbar } from '../../../actions/setsnackbar';

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
        if (profile.username === 'love') {
            dispatch(setSnackbar(true, 'warning', 'Changing/deleting demo user photos is now allowed. Please create your own account.'));
        } else {
            await dispatch(savePhotos({ key: 'photo', value: images }));
            handleClose();
            dispatch(getProfile('myProfile', profile.user_id));
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
            <Button onClick={save}>Save</Button>
        </Box>
    );
};

export default ImageGridListOwn;
