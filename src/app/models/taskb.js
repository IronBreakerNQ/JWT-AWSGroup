const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskbSchema = new Schema({
    methoda: {type:Boolean, default:false},
    user: [{ type: Schema.Types.ObjectId, ref: 'Child' }],
}, {
    timestamps: true,
});

const Taskb = mongoose.model('Taskb', TaskbSchema);

module.exports = Taskb;
