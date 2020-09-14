const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profile_helper');

const upload = async (req, res) => {

	return res.json({ 'msg': 'succesfully saved' });

}


module.exports = {
	upload
}
