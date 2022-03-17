const  jwt = require('jsonwebtoken');
const secret = require('../config/jwtsecret.json');

exports.verifyToken = async function verifyToken(req, res, next) {
    const token = req.session.token;
    jwt.verify(token, secret.secret, (err, decoded) => {
        if(err) return console.log(`Erro: ${err}`);
        next();
    });
}
