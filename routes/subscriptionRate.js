// const Subscription = require('../models/Subscription');
// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const fs = require('fs');

// // POST API to create or update a subscription
// router.post('/subscription', async (req, res) => {
//     const { email, subscriptionPrice } = req.body;

//     if (!email || !subscriptionPrice) {
//         return res.status(400).json({ error: 'Please provide email and subscriptionPrice' });
//     }

//     try {
//         const updatedSubscription = await Subscription.findOneAndUpdate(
//             { email },
//             { email, subscriptionPrice },
//             { new: true, upsert: true } // upsert will create a new document if one doesn't exist
//         );
//         res.status(201).json(updatedSubscription);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // GET API to retrieve a subscription by email
// router.get('/subscription/:email', async (req, res) => {
//     const { email } = req.params;

//     try {
//         const subscription = await Subscription.findOne({ email });

//         if (!subscription) {
//             return res.status(404).json({ error: 'Subscription not found' });
//         }

//         res.json(subscription);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // PUT API to update subscription price by email
// router.put('/subscription/:email', async (req, res) => {
//     const { email } = req.params;
//     const { subscriptionPrice } = req.body;

//     if (!subscriptionPrice) {
//         return res.status(400).json({ error: 'Please provide subscriptionPrice' });
//     }

//     try {
//         const subscription = await Subscription.findOneAndUpdate(
//             { email },
//             { subscriptionPrice },
//             { new: true }
//         );

//         if (!subscription) {
//             return res.status(404).json({ error: 'Subscription not found' });
//         }

//         res.json(subscription);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // POST API to calculate total price
// router.post('/calculate-total-price', async (req, res) => {
//     const { count } = req.body;

//     if (!count) {
//         return res.status(400).json({ error: 'Please provide count' });
//     }

//     try {
//         const subscription = await Subscription.findOne();

//         if (!subscription) {
//             return res.status(404).json({ error: 'Subscription not found' });
//         }

//         const totalPrice = subscription.subscriptionPrice * count;
//         res.json({ totalPrice });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // POST API to save employee count
// router.post('/save-count', async (req, res) => {
//     const { payment } = req.body;

//     if (!payment) {
//         return res.status(400).json({ error: 'Please provide payment' });
//     }

//     try {
//         const subscription = await Subscription.findOne();

//         if (!subscription) {
//             return res.status(404).json({ error: 'Subscription not found' });
//         }

//         const employeeCount = Math.floor(payment / subscription.subscriptionPrice);

//         const employeeData = {
//             employeeCount,
//             payment,
//             timestamp: new Date().toISOString()
//         };

//         fs.writeFile('EmployeeCount.json', JSON.stringify(employeeData, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to save employee count' });
//             }
//             res.json(employeeData);
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // GET API to fetch employee count from EmployeeCount.json
// router.get('/employee-count', (req, res) => {
//     fs.readFile('EmployeeCount.json', 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to read employee count' });
//         }
//         try {
//             const employeeData = JSON.parse(data);
//             res.json(employeeData);
//         } catch (parseErr) {
//             res.status(500).json({ error: 'Failed to parse employee count data' });
//         }
//     });
// });

// module.exports= router;

const Subscription = require('../models/Subscription');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

// POST API to create or update a subscription
router.post('/subscription', async (req, res) => {
    const { email, subscriptionPrice } = req.body;

    if (!email || !subscriptionPrice) {
        return res.status(400).json({ error: 'Please provide email and subscriptionPrice' });
    }

    try {
        const updatedSubscription = await Subscription.findOneAndUpdate(
            { email },
            { email, subscriptionPrice },
            { new: true, upsert: true } // upsert will create a new document if one doesn't exist
        );
        res.status(201).json(updatedSubscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET API to retrieve a subscription by email
router.get('/subscription/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const subscription = await Subscription.findOne({ email });

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        res.json(subscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT API to update subscription price by email
router.put('/subscription/:email', async (req, res) => {
    const { email } = req.params;
    const { subscriptionPrice } = req.body;

    if (!subscriptionPrice) {
        return res.status(400).json({ error: 'Please provide subscriptionPrice' });
    }

    try {
        const subscription = await Subscription.findOneAndUpdate(
            { email },
            { subscriptionPrice },
            { new: true }
        );

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        res.json(subscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST API to calculate total price
router.post('/calculate-total-price', async (req, res) => {
    const { count } = req.body;

    if (!count) {
        return res.status(400).json({ error: 'Please provide count' });
    }

    try {
        const subscription = await Subscription.findOne();

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        const totalPrice = subscription.subscriptionPrice * count;
        res.json({ totalPrice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST API to save employee count
router.post('/save-count', async (req, res) => {
    const { payment } = req.body;

    if (!payment) {
        return res.status(400).json({ error: 'Please provide payment' });
    }

    try {
        const subscription = await Subscription.findOne();

        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        const employeeCount = Math.floor(payment / subscription.subscriptionPrice);

        const employeeData = {
            employeeCount,
            payment,
            timestamp: new Date().toISOString()
        };

        fs.writeFile('EmployeeCount.json', JSON.stringify(employeeData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save employee count' });
            }
            res.json(employeeData);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET API to fetch employee count from EmployeeCount.json
router.get('/employee-count', (req, res) => {
    fs.readFile('EmployeeCount.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read employee count' });
        }
        try {
            const employeeData = JSON.parse(data);
            res.json(employeeData);
        } catch (parseErr) {
            res.status(500).json({ error: 'Failed to parse employee count data' });
        }
    });
});

module.exports= router;