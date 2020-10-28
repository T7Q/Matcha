import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { FormGroup, Button, Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from '../../../styles/custom';
import { editProfile } from '../../../actions/profile';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapStyles from './mapStyles';

const Geolocation = ({ user, editProfile, setSnackbar }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const [marker, setMarker] = useState({
        lat: user.latitude,
        lng: user.longitude,
    });
    const classes = useStyles();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('/profile/edit', { key: 'location', value: marker });
            if (res.data.error) {
                setSnackbar(true, 'error', 'Could not update your location. Try later.');
            } else {
                user.latitude = marker.lat;
                user.longitude = marker.lng;
                editProfile(user);
                setSnackbar(true, 'success', res.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleMapClick = (event) => {
        setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    };

    const mapContainerStyle = {
        width: '40vw',
        height: '40vh',
    };
    const mapContainerStyleSm = {
        width: '80vw',
        height: '60vh',
    };

    const center = {
        lat: marker.lat,
        lng: marker.lng,
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    };

    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps';
    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Box>
                    <GoogleMap
                        mapContainerStyle={isMobile ? mapContainerStyleSm : mapContainerStyle}
                        zoom={8}
                        center={center}
                        options={options}
                        onClick={handleMapClick}>
                        <Marker position={{ lat: marker.lat, lng: marker.lng }} />
                    </GoogleMap>
                </Box>
                <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    color="primary"
                    className={`${classes.customButton} ${classes.p2}`}>
                    Save
                </Button>
            </FormGroup>
        </form>
    );
};

Geolocation.propTypes = {
    editProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { editProfile })(Geolocation);
