const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    gmail: {type:String, require:true},
    name: {type:String, require:true},
    passWorld: {type:String, require:true},
    children: [{ type: Schema.Types.ObjectId, ref: 'Child' }],
    Group: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    publicKey: {type:String, require:true},
    rolea: {type:Boolean, default:false},
    rolea: {type:Boolean, default:false},
    rolea: {type:Boolean, default:false},
    rolea: {type:Boolean, default:false},
}, {
    timestamps: true,
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
