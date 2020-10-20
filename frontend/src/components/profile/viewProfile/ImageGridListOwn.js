import React, { useState, useEffect } from 'react';
import { Button, Box } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';

const ImageGridListOwn = ({ profile }) => {
    const [images, setImages] = useState({
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        profile: 0,
    });
    const photos = profile['photos'];

    const bases = {
        base1: '',
        base2: '',
        base3: '',
        base4: '',
        base5: '',
    };

    const profilePhoto = photos
        .map((tile, index) => {
            if (tile.image_path === profile.profile_pic_path) {
                return index + 1;
            }
        })
        .filter(el => el);
    console.log('prof photo', profilePhoto);

    while (photos.length < 5) {
        photos.push({ image_path: '' });
    }

    useEffect(() => {}, []);

    const onFileToBase64 = (file, base) => {
        if (!file) {
            return;
        }
        console.log('here');
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            bases[[base]] = event.target.result;
        };
    };

    const handleUpload = (upload, key, base, text) => {
        console.log('upload key', key, 'base', base);
        if (upload.length > 0) {
            if (text === 'Profile photo') {
                setImages({ ...images, [key]: upload, profile: key });
            } else {
                setImages({ ...images, [key]: upload });
            }
        }
    };

    const save = () => {
        Object.entries(images).forEach(entry => onFileToBase64(entry[1][0], `base${entry[0]}`));
        console.log('bases', bases);
        console.log('photos', photos);
    };

    if (photos.length === 0) {
        return <div>No images in this account</div>;
    }
    console.log('photos', photos);
    console.log('images before render', images);
    console.log('bases before render', bases);

    return (
        <Box textAlign="center">
            {photos.map((tile, index) => {
                const initial = tile.image_path !== '' ? [tile.image_path] : images[index + 1];
                const text = tile.image_path === profile.profile_pic_path ? 'Profile photo' : '';
                return (
                    <DropzoneArea
                        key={index}
                        acceptedFiles={['image/*']}
                        onChange={upload => handleUpload(upload, index + 1, 'base' + (index + 1), text)}
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
