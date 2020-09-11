
module.exports = (req, res) => {
    console.log('hello');
    console.log(req.body);
    return res.send('here');
}
