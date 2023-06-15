const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Fashionshow = require('./../models/fashionshow')
const path = require('path')

// GET- get all Fashionshow ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
    Fashionshow.find().populate('user', '_id firstName lastName')
    .then(fashionshow => {
      if(fashionshow == null){
        return res.status(404).json({
          message: "No fashionshow found"
        })
      }
      res.json(fashionshow)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting fashionshow"
      })
    })  
})

// POST - create new fashionshow --------------------------------------
router.post('/', (req, res) => {
    // validate 
    if(Object.keys(req.body).length === 0){   
      return res.status(400).send({message: "fashionshow content can't be empty"})
    }
    // validate - check if image file exist
    if(!req.files || !req.files.image){
      return res.status(400).send({message: "Image can't be empty"})
    }
  
    console.log('req.body = ', req.body)
  
    // image file must exist, upload, then create new fashionshow
    let uploadPath = path.join(__dirname, '..', 'public', 'images')
    Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {    
      // create new fashionshow
      let newFashionshow = new Fashionshow({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        user: req.body.user,
        image: uniqueFilename,
      })
    
      newFashionshow.save()
      .then(fashionshow => {        
        // success!  
        // return 201 status with fashionshow object
        return res.status(201).json(fashionshow)
      })
      .catch(err => {
        console.log(err)
        return res.status(500).send({
          message: "Problem creating fashionshow",
          error: err
        })
      })
    })
  })
  

// export
module.exports = router