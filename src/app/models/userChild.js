const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const childSchema = new Schema({
    name: {type:String, require:true},
    passWorld: {type:String, require:true},
    publicKey: {type:String, require:true},
    rolea: {type:Boolean, default:false},
    rolea: {type:Boolean, default:false},
    rolea: {type:Boolean, default:false},
    rolea: {type:Boolean, default:false},
}, {
    timestamps: true,
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;
