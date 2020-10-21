const axios = require('axios');

const isValidLatitude = lat => {
    const latitude = parseFloat(lat);
    return !isNaN(latitude) && Math.abs(latitude) <= 90;
};

const isValidLongitude = lon => {
    const longitude = parseFloat(lon);
    return !isNaN(longitude) && Math.abs(longitude) <= 180;
};

const getLocation = async req => {
    if (isValidLatitude(req.body.latitude) && isValidLongitude(req.body.longitude)) {
        return { latitude: parseFloat(req.body.latitude), longitude: parseFloat(req.body.longitude) };
    }
    try {
        const location = await axios('https://ipinfo.io/geo');
        const locs = location.data.loc.split(',');
        return { latitude: locs[0], longitude: locs[1] };
    } catch {
        return { latitude: 60.207, longitude: 24.86 };
    }
};

module.exports = { getLocation, isValidLatitude, isValidLongitude };
