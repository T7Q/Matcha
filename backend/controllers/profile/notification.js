const profileModel = require('../../models/profile');
const accountModel = require('../../models/account');
const { findUserInfo } = require('../../models/account');

const edit = async (req, res) => {
	const { user_id, key } = req.body;
	// validate input parameters
	if (!key) {
        return res.json({ error: 'Invalid parameters' });
	}
	let settings;
	// Find current notification setting
	switch (key) {
		case "email_notification":
			try {
				settings = await findUserInfo("user_id", user_id, "email_notification");
				settings = settings.email_notification
			} catch (e) {
				return res.json({ error: "Something went wrong fetching data from the database" });
			}
			break;
		case "real_time_notification":
			try {
				settings = await findUserInfo("user_id", user_id, "real_time_notification");
				settings = settings.real_time_notification
			} catch (e) {
				return res.json({ error: "Something went wrong fetching data from the database" });
			}
			break;
		default:
			return res.json({ error: 'Invalid parameters'});
	}

	let value  = (settings === true ? 0 : 1);

	try {
        await profileModel.editProfile(user_id, key, value);
		return res.json({	msg: "Notification settings were successfully updated",
							notification: value
						});
	} catch (e) {
		return res.json({ error: "Something went wrong adding Profile info" });
	}
}

module.exports = {
	edit
}