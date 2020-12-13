const {model, Types} = require('mongoose');
const mongoose = require('mongoose');

const schm = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  links: [{ type: Types.ObjectId, ref: 'Link' }]
})

module.exports = model('User', schm)