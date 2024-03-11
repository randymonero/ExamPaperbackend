const Subscription = require('../models/subscription');

// Subscribe user to a plan
exports.subscribe = async (req, res) => {
  try {
    const { userId, plan, duration } = req.body;

    if (!userId || !plan || !duration) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Implement logic to create a new subscription record in the database
    const newSubscription = new Subscription({ userId, plan, duration });
    await newSubscription.save();

    res.status(201).json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Subscription failed:', error);
    res.status(500).json({ message: 'Subscription failed' });
  }
};

// Check subscription status
exports.checkSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is extracted from the JWT token

    // Implement logic to check the user's subscription status
    const subscription = await Subscription.findOne({ userId });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json(subscription);
  } catch (error) {
    console.error('Error checking subscription status:', error);
    res.status(500).json({ message: 'Failed to check subscription status' });
  }
};