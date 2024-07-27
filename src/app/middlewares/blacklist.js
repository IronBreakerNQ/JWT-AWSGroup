const BlackListModel = require('../models/blacklist');

class Blacklist {
    async set(token) {
        try {
            const blacklistEntry = new BlackListModel({ token });
            const savedBlackList = await blacklistEntry.save();
            console.log(savedBlackList);
        } catch (err) {
            console.error(err);
            throw err; // Truyền lỗi để xử lý ở nơi gọi
        }
    }

    async get(token) {
        try {
            const blacklistEntry = await BlackListModel.findOne({ token }).select('token');
            console.log(blacklistEntry);
            return blacklistEntry;
        } catch (err) {
            console.error(err);
            throw err; // Truyền lỗi để xử lý ở nơi gọi
        }
    }
}

module.exports = new Blacklist();
