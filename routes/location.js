// routes/location.js
const express = require('express');
const router = express.Router();
const SubEmployee = require('../models/SubEmployee');
const fs = require('fs');
const path = require('path');
const axios=require('axios')

// get location api 
router.get('/getGeolocation', async (req, res) => {
    try {
        const ipResponse = await axios.get('https://ipapi.co/json/');
        const { ip, latitude, longitude } = ipResponse.data;

        res.status(200).json({
            ip,
            latitude,
            longitude,
        });
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


module.exports = router;
