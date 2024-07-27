const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Root = require('../models/userRoot');
async function authenticateTokenRoot(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Nếu không có token, trả về lỗi 401 (Unauthorized)
    }

    const decoded = jwt.decode(token);
    const publicKey= await Root.findById(decoded.userId).select('publicKey');
    const publicKeyObject = crypto.createPublicKey(publicKey.publicKey);

    jwt.verify(token,publicKeyObject,(err,decode) =>{
        if (err) {
            return res.sendStatus(403); 
        }
        req.user = decode;
        next(err); 
    })

}

module.exports = authenticateTokenRoot;
