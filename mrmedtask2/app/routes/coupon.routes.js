const express = require('express');
const router  = express.Router();

const couponController = require('../controllers/coupon.controller.js');


// Create a new Coupon
router.post('/mrMed/coupons', couponController.create);

// Retrieve all Coupons
router.get('/mrMed/coupons', couponController.findAll);

//Retrive Active Coupon
router.get('/mrMed/coupons/:Status/:StartDate', couponController.findByStatus);

router.get('/mrMed/coupons/users', couponController.createTo);

// Retrieve a single Coupon with CouponId
router.get('/mrMed/coupons/:couponId', couponController.findOne);

// Update a Coupon with couponId
router.put('/mrMed/coupons/:couponId', couponController.update);

// Delete a Banner with couponId
router.delete('/mrMed/coupons/:couponId', couponController.delete);
   
module.exports = router;