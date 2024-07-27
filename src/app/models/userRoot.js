const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rootSchema = new Schema({
    gmail: {type:String, require:true},
    name: {type:String, require:true},
    passWorld: {type:String, require:true},
    publicKey: {type:String},
    Admin: [{ type: Schema.Types.ObjectId, ref: 'Admin' }],
}, {
    timestamps: true,
});

const Root = mongoose.model('Root', rootSchema);

module.exports = Root;
