const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Subscribe route
router.post('/subscribe', subscriptionController.subscribe);

// Check subscription status route
router.get('/status', subscriptionController.checkSubscriptionStatus);

module.exports = router;