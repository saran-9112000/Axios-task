const express = require('express');
const router  = express.Router();

const bannerController = require('../controllers/banner.controller.js');

// Create a new Banner
router.post('/mrMed/banners', bannerController.create);

// Retrieve all Banners
router.get('/mrMed/banners', bannerController.findAll);

// Retrieve a single Banner with bannerId
router.get('/mrMed/banners/:bannerId', bannerController.findOne);

// Update a Banner with bannerId
router.put('/mrMed/banners/:bannerId', bannerController.update);

// Delete a Banner with bannerId
router.delete('/mrMed/banners/:bannerId', bannerController.delete);
   
module.exports = router;