const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const fashionshowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String    
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true    
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
  
}, { timestamps: true })

//model
const fashionshowModel = mongoose.model('Fashionshow', fashionshowSchema)

//export
module.exports = fashionshowModel