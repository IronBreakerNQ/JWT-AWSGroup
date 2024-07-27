const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Admin = require('../models/userAdmin');
const blacklist = require('./blacklist');

async function authenticateRfTokenRoot(req, res, next) {
    const mailCheck = true; 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (mailCheck) {
        if (token == null) {
            return res.sendStatus(401); 
        }
    
        try {
            const blacklistedToken = await blacklist.get(token);
            if (blacklistedToken !== null) {
                return res.json({ message: "Token đã bị đưa vào danh sách đen. Vui lòng đăng nhập lại." });
            } else {
                await blacklist.set(token);
                return next();
            }
        } catch (err) {
            console.error(err);
            return res.sendStatus(500); // Lỗi máy chủ nội bộ
        }
    } else {
        res.status(404).send("Không tìm thấy");
    }
}

module.exports = authenticateRfTokenRoot;
