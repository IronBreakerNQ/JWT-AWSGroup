const bcrypt = require('bcrypt');

async function HassPassWorld(passWorld) {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(passWorld, saltRounds);
        console.log('Mật khẩu đã băm:', hashedPassword);
        return hashedPassword;
    } catch (err) {
        console.error('Lỗi băm mật khẩu:', err);
        throw err; 
    }
}

module.exports = HassPassWorld;
