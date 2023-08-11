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

        //store decoded user info in one req-res session. User info can now accessed thru API endpoints
        req.user = decoded;
        //or use this
        res.locals.userId=decoded.userId;
        //console.log(req.user)
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid Token' });
        console.log(err)

    }
    next();
}