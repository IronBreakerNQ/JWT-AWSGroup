const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // hết hạn sau 1 giờ
    }
});

const BlackListModel = mongoose.model('BlackList', blacklistSchema);

module.exports = BlackListModel;
