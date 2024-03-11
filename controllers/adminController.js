const Document = require('../models/document');
const User = require('../models/User');
const Subscription = require('../models/subscription');

// Verify document
exports.verifyDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Add condition to check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Only admin can verify documents' });
    }

    document.verified = true;
    await document.save();

    res.status(200).json({ message: 'Document verified successfully' });
  } catch (error) {
    console.error('Document verification failed:', error);
    res.status(500).json({ message: 'Document verification failed' });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add condition to check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Only admin can delete users' });
    }

    await user.remove();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('User deletion failed:', error);
    res.status(500).json({ message: 'User deletion failed' });
  }
};

exports.manageSubscription = async (req, res) => {
  try {
    const { userId, action } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has been approved by the admin and has paid
    if (!user.approved || !user.paid) {
      return res.status(400).json({ message: 'User is not approved or has not paid' });
    }

    // Find the subscription for the user
    let subscription = await Subscription.findOne({ userId });

    // If user doesn't have a subscription and wants to subscribe
    if (!subscription && action === 'subscribe') {
      subscription = new Subscription({
        userId,
        startDate: new Date(),
        endDate: new Date(), // Set the end date based on the duration
        duration: '1year', // Set the duration based on the action
        status: 'active', // Set status to active
      });
    }

    // If user has a subscription and wants to unsubscribe
    if (subscription && action === 'unsubscribe') {
      subscription.status = 'expired'; // Set status to expired
    }

    // Save the subscription
    await subscription.save();

    res.status(200).json({ message: 'Subscription updated successfully' });
  } catch (error) {
    console.error('Subscription management failed:', error);
    res.status(500).json({ message: 'Subscription management failed' });
  }
};

// Get analytics
exports.getAnalytics = async (req, res) => {
  try {
     // Count the total number of documents
     const totalDocuments = await Document.countDocuments();

     // Get the most downloaded document
     const mostDownloadedDocument = await Document.findOne().sort({ downloads: -1 });
 
     // Get the number of users
     const totalUsers = await User.countDocuments();
 
     // Get the number of active subscriptions
     const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
 
     // Prepare the analytics data
     const analyticsData = {
       totalDocuments,
       mostDownloadedDocument,
       totalUsers,
       activeSubscriptions,
     };
    
    res.status(200).json(analyticsData,{ message: 'Analytics data retrieved successfully' });
    console.log('Analytics data retrieved successfully');
  } catch (error) {
    console.error('Analytics retrieval failed:', error);
    res.status(500).json({ message: 'Analytics retrieval failed' });
  }
};
console.log("controller");
