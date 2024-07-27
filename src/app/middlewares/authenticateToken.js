const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Nếu không có token, trả về lỗi 401 (Unauthorized)
    }

    const publicKey=req.publicKey;

    jwt.verify(token,publicKey,(err,decode) =>{
        if (err) {
            return res.sendStatus(403); 
        }
        req.user = decode;
        next(err); 
    })

}

module.exports = authenticateToken;
