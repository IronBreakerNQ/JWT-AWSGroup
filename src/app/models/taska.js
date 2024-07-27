const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskaSchema = new Schema({
    methoda: {type:Boolean, default:false},
    user: [{ type: Schema.Types.ObjectId, ref: 'Child' }],
}, {
    timestamps: true,
});

const Taska = mongoose.model('Taska', TaskaSchema);

module.exports = Taska;
