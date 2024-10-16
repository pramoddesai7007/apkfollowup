// combinedMiddleware.js
const fs = require('fs');
//const subscriptionMiddleware = require('./subscriptionMiddleware');
//const yearlySubscriptionMiddleware = require('./yearlySubscriptionMiddleware');

const combinedMiddleware = (req, res, next) => {
    let registrationData;
  let subscriptionData;

  try {
    // Load subscription data from file
    registrationData = JSON.parse(fs.readFileSync('registration.json'));
    subscriptionData = JSON.parse(fs.readFileSync('subscription.json'));
  } catch (err) {
    console.error('Error reading subscription data:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  const isRegistered = registrationData && registrationData.status === 'registered';
  const isRegistrationExpired = registrationData && new Date() > new Date(registrationData.registrationEndDate);
  const isSubscribed = subscriptionData && subscriptionData.status === 'subscribed';
  const isYearlySubscriptionExpired = subscriptionData && new Date() > new Date(subscriptionData.subscriptionEndDate);

  if (!isRegistered) {
    // Stop the server if user is not registered
    console.log('User is not registered. Stopping the server.');
    process.exit(1);
  }

  if (isRegistered && isRegistrationExpired && !isSubscribed) {
    // Stop the server if subscription is expired and user is not subscribed
    console.log('Subscription expired. Stopping the server.');
    process.exit(1);
  }

  if (isSubscribed && isYearlySubscriptionExpired) {
    // Stop the server if yearly subscription is expired and user is subscribed
    console.log('Yearly subscription expired. Stopping the server.');
    process.exit(1);
  }

  // If none of the conditions match, continue with the application
  next();
};

module.exports = combinedMiddleware;
