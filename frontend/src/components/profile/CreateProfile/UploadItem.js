import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { useStyles } from '../../../styles/custom';

const ImageItem = ({ images, setImages }) => {
    const classes = useStyles();

    const onFileToBase64 = (file, base) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            setImages({ ...images, [base]: event.target.result });
        };
    };

    const handleUpload = (upload, key, base) => {
        if (upload.length > 0) {
            setImages({ ...images, [key]: upload });
            onFileToBase64(upload[0], base);
        }
    };

    return (
        <Box>
            <Box pb={2}>
                <Typography variant="h5" className={classes.customHeader}>
                    Add photos of you
                </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    clearOnUnmount={false}
                    onChange={upload => handleUpload(upload, 1, 'base1')}
                    showFileNames
                    initialFiles={images[1]}
                    dropzoneText="Add photo here"
                    showAlerts={false}
                    filesLimit={1}
                />
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    clearOnUnmount={false}
                    onChange={upload => handleUpload(upload, 2, 'base2')}
                    showFileNames
                    initialFiles={images[2]}
                    dropzoneText="Add photo here"
                    showAlerts={false}
                    filesLimit={1}
                />
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    clearOnUnmount={false}
                    onChange={upload => handleUpload(upload, 3, 'base3')}
                    showFileNames
                    initialFiles={images[3]}
                    dropzoneText="Add photo here"
                    showAlerts={false}
                    filesLimit={1}
                />
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    clearOnUnmount={false}
                    onChange={upload => handleUpload(upload, 4, 'base4')}
                    showFileNames
                    initialFiles={images[4]}
                    dropzoneText="Add photo here"
                    showAlerts={false}
                    filesLimit={1}
                />
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    clearOnUnmount={false}
                    onChange={upload => handleUpload(upload, 5, 'base5')}
                    showFileNames
                    initialFiles={images[5]}
                    dropzoneText="Add photo here"
                    showAlerts={false}
                    filesLimit={1}
                />
            </Box>
        </Box>
    );
};

export default ImageItem;
