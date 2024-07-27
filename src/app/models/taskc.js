const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskcSchema = new Schema({
    methoda: {type:Boolean, default:false},
    user: [{ type: Schema.Types.ObjectId, ref: 'Child' }],
}, {
    timestamps: true,
});

const Taskc = mongoose.model('Taskc', TaskcSchema);

module.exports = Taskc;
