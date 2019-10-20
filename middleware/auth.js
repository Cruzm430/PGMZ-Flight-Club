const jwt = require('jsonwebtoken')


// place this middlewhere function wherever auth is required 
function authMiddleware(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.')

    try {
        const decodedPaylod = jwt.verify(token, 'private key here');   
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('invalid token')
    }
}

module.exports = authMiddleware