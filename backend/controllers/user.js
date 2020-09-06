const validate = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Invalid parameters');
    }
    next();
}

module.exports = {
    validate
}
