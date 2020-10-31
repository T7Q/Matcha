import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormGroup, Box, useMediaQuery } from '@material-ui/core';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import { updateUser } from '../../../actions/auth';
import { editProfile } from '../../../actions/profile';
import mapStyles from './mapStyles';
import Button from '../../common/Button';

const Geolocation = ({ setSnackbar }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [marker, setMarker] = useState({
        lat: user.latitude,
        lng: user.longitude,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await dispatch(editProfile({ key: 'location', value: marker }));
        if (res && res.error) {
            setSnackbar(true, 'error', 'Could not update your location. Try later.');
        } else {
            dispatch(updateUser({ ...user, latitue: marker.lat, longitude: marker.lng }));
        }
    };

    const handleMapClick = (event) => {
        setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
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

    const mapContainerStyle = {
        width: '40vw',
        height: '40vh',
    };
    const mapContainerStyleSm = {
        width: '80vw',
        height: '60vh',
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
                <Button type="submit">Save</Button>
            </FormGroup>
        </form>
    );
};

export default Geolocation;
