const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Masterclass = require('./../models/Masterclass')
const path = require('path')

// GET- get all Masterclasses---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
    Masterclass.find().populate('user', '_id firstName lastName')
    .then(masterclass => {
      if(masterclass == null){
        return res.status(404).json({
          message: "No masterclass found"
        })
      }
      res.json(masterclass)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting masterclass"
      })
    })  
})

// POST - create new masterclass --------------------------------------
router.post('/', (req, res) => {
    // validate 
    if(Object.keys(req.body).length === 0){   
      return res.status(400).send({message: "Masterclass content can't be empty"})
    }
    // validate - check if image file exist
    if(!req.files || !req.files.image){
      return res.status(400).send({message: "Image can't be empty"})
    }
  
    console.log('req.body = ', req.body)
  
    // image file must exist, upload, then create new masterclass
    let uploadPath = path.join(__dirname, '..', 'public', 'images')
    Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {    
      // create new masterclass
      let newMasterclass = new Masterclass({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        user: req.body.user,
        image: uniqueFilename,
      })
    
      newMasterclass.save()
      .then(masterclass => {        
        // success!  
        // return 201 status with masterclass object
        return res.status(201).json(masterclass)
      })
      .catch(err => {
        console.log(err)
        return res.status(500).send({
          message: "Problem creating masterclass",
          error: err
        })
      })
    })
  })
  


// export
module.exports = router