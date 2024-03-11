const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Verify document route
router.patch('/verify/:id', authMiddleware.isAdmin, adminController.verifyDocument);

// Retrieve analytics route
router.get('/analytics', adminController.getAnalytics);
console.log("here is the adminroute");

// Delete user route (restricted to admin)
router.delete('/users/:userId', authMiddleware.isAdmin, adminController.deleteUser);

// Subscribe user route (restricted to admin)
router.post('/subscribe/:userId', authMiddleware.isAdmin, adminController.manageSubscription);

// Unsubscribe user route (restricted to admin)
router.post('/unsubscribe/:userId', authMiddleware.isAdmin, adminController.manageSubscription);

module.exports = router;