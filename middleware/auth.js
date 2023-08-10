const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    var token = req.headers.authorization;
    console.log(token);
    if (!token)
        res.status(401).json({ error: 'Invalid Token' });

    if (!token.startsWith('Bearer '))
        res.status(401).json({ error: 'Invalid Token' });
    token = token.split(' ')[1]
    var jwtPrivateKey = config.get('jwtPrivateKey');
    try {
        var decoded = jwt.verify(token, jwtPrivateKey)
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid Token' });
        console.log(err)

    }
    next();
}