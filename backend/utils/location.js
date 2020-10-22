const axios = require('axios');
// const geoip = require('geoip-lite');
// const { ipstack } = require('../config');

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
    // let location = geoip.lookup(req.ip);

    // if (!location || !location.ll) {
    //     location = await axios({ url: `http://api.ipstack.com/check?access_key=${process.env.IPSTACK}` });
    //     return { latitude: location.data.latitude, longitude: location.data.longitude };
    // }
    try {
        let location = await axios('https://ipinfo.io/geo');

        let locs = location.data.loc.split(',');
        return { latitude: locs[0], longitude: locs[1] };
    } catch {
        return { latitude: 60.207, longitude: 24.86 };
    }
};

module.exports = { getLocation, isValidLatitude, isValidLongitude };
