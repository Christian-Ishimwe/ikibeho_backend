const express = require('express');
const router = express.Router();
const { createDonation,getAllDonations,getDonationsByType,getDonationById,deleteDonation,updateDonation} = require('../controllers/donationController');
const {isVerified, isSuperAdmin}= require("../middleware/jwtVerify")

router.get('/',isVerified, getDonationsByType);
router.get('/all',isVerified, getAllDonations);
router.get('/:id', isVerified, getDonationById);
router.delete('/:id', isVerified, deleteDonation);
router.put('/:id', isVerified, updateDonation);

router.post('/', createDonation);

module.exports = router;
