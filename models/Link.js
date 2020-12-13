const {model, Types} = require('mongoose');
const mongoose = require('mongoose');

const schm = new mongoose.Schema({
 from: {type: String, required: true},
 to: {type: String, required: true, unique: true},
 code: {type: String, required: true, unique: true},
 date: {type: Date, default: Date.now},
 clicks: {type: Number, default: 0},
 owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Link', schm)