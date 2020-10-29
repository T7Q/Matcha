const axios = require('axios');
const geoip = require('geoip-lite');

const isValidLatitude = (lat) => {
    const latitude = parseFloat(lat);
    return !isNaN(latitude) && Math.abs(latitude) <= 90;
};

const isValidLongitude = (lon) => {
    const longitude = parseFloat(lon);
    return !isNaN(longitude) && Math.abs(longitude) <= 180;
};

const getLocation = async (req) => {
    if (isValidLatitude(req.body.latitude) && isValidLongitude(req.body.longitude)) {
        return {
            latitude: parseFloat(req.body.latitude),
            longitude: parseFloat(req.body.longitude),
        };
    }
    let location = geoip.lookup(req.ip);

    if (!location || !location.ll) {
        try {
            let location = await axios('https://ipinfo.io/geo');
            let locs = location.data.loc.split(',');
            return { latitude: locs[0], longitude: locs[1] };
        } catch {
            return { latitude: 60.207, longitude: 24.86 };
        }
    }
    return { latitude: location.ll[0], longitude: location.ll[1] };
};

module.exports = { getLocation, isValidLatitude, isValidLongitude };
