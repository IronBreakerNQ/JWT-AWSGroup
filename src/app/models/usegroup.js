const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GroupSchema = new Schema({
    admin: {type: Schema.Types.ObjectId, require: "true"},
    children: [{ type: Schema.Types.ObjectId, ref: 'Child' }],
    methoda: {type:Boolean, default:false},
    methodb: {type:Boolean, default:false},
    methodc: {type:Boolean, default:false},
}, {
    timestamps: true,
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
