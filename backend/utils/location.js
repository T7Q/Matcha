require('dotenv').config({ path: 'config/.env' });
const axios = require("axios");
const geoip = require('geoip-lite');

const isValidLatitude = lat => {
    const latitude = parseFloat(lat);
    return !isNaN(latitude) && Math.abs(latitude) <= 90;
};

const isValidLongitude = lon => {
    const longitude = parseFloat(lon);
    return !isNaN(longitude) && Math.abs(longitude) <= 180;
};

module.exports = async (req, user) => {
    if (isValidLatitude(req.latitude) && isValidLongitude(req.longitude)) {
        return { 'latitude': parseFloat(req.body.latitude), 'longitude': parseFloat(req.body.longitude) };
    }

    let location = geoip.lookup(req.ip);

    if (!location || !location.ll) {
        if (user.latitude && user.longitude) {
            return { 'latitude': user.latitude, 'longitude': user.longitude };
        } else {
            location = await axios({ url: `http://api.ipstack.com/check?access_key=${process.env.IPSTACK}` });

            return { 'latitude': location.data.latitude, 'longitude': location.data.longitude };
        }
    }

    return { 'latitude': location.ll[0], 'longitude': location.ll[1] };
}
