const matchModel = require('../../models/match');
const matchHelper = require('../../models/matchHelper');


module.exports = async (req, res) => {
	console.log("hello")
	// return res.json(req);
	return res.json({ 'msg': 'success' });
}
