const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const masterclassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  professional: {
    type: String    
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
const masterclassModel = mongoose.model('Masterclass', masterclassSchema)

//export
module.exports = masterclassModel