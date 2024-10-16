// require('dotenv').config(); // Load environment variables from .env file

// const ConnectToMongodb = require('./db');
// const express = require('express');
// const app = express();
// const fs = require('fs');
// const passport = require('passport'); // Import Passport
// require('./passport-config'); // Import your Passport configuration
// const jwtMiddleware = require('./jwtmiddleware');
// const path=require('path')
// var cors = require('cors');
// const dbHost = process.env.DB_HOST;



// ConnectToMongodb();
// const port = process.env.PORT;

// app.use(cors());
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// app.use(passport.initialize());
// app.use('/uploads/profile-pictures', express.static(path.join(__dirname, 'uploads', 'profile-pictures')));
// app.use('/uploads/LeadPicture', express.static(path.join(__dirname, 'uploads', 'LeadPicture')));
// app.use('/uploads/pictures', express.static(path.join(__dirname, 'uploads', 'pictures')));
// app.use('/uploads/audio', express.static(path.join(__dirname, 'uploads', 'audio')));
// app.use(express.static('uploads')); // 'uploads' should be the directory where your images are stored




// // Endpoint to register for free trial
// // app.post('/register', (req, res) => {
// //   const {email } = req.body;
// //   const registrationDate = new Date();
// //   const registrationEndDate = new Date(registrationDate.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

// //   // Save registration data to file
// //   const newData = {
// //     email,
// //     registrationDate,
// //     registrationEndDate,
// //     status: 'registered'
// //   };

// //   fs.writeFileSync('registration.json', JSON.stringify(newData));

// //   res.json({ message: 'Registration successful', data: newData });
// // });

// app.post('/register', (req, res) => {
//   const { email } = req.body;
//   const registrationDate = new Date();
//   const registrationEndDate = new Date(registrationDate.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

//   const newRegistration = {
//     email,
//     registrationDate,
//     registrationEndDate,
//     status: 'registered'
//   };

//   const filePath = path.join(__dirname, 'registration.json');

//   fs.readFile(filePath, 'utf8', (err, data) => {
//     let registrations = [];
//     if (err) {
//       if (err.code !== 'ENOENT') {
//         return res.status(500).json({ error: 'Failed to read registration file' });
//       }
//     } else {
//       try {
//         registrations = JSON.parse(data);
//         if (!Array.isArray(registrations)) {
//           registrations = [];
//         }
//       } catch (parseErr) {
//         return res.status(500).json({ error: 'Failed to parse registration file' });
//       }
//     }

//     // Check if email already exists
//     const emailExists = registrations.some(registration => registration.email === email);
//     if (emailExists) {
//       return res.status(400).json({ error: 'Email already registered' });
//     }

//     registrations.push(newRegistration);

//     fs.writeFile(filePath, JSON.stringify(registrations, null, 2), (writeErr) => {
//       if (writeErr) {
//         return res.status(500).json({ error: 'Failed to write registration file' });
//       }
//       res.json({ message: 'Registration successful', data: newRegistration });
//     });
//   });
// });

// // // Endpoint to register for yearly subscription
// // app.post('/subscribe-yearly', (req, res) => {
// //   const { email } = req.body;
// //   const subscriptionStartDate = new Date();
// //   const subscriptionEndDate = new Date(subscriptionStartDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 365 days from now

// //   // Save subscription data to file
// //   const newData = {
// //     email,
// //     subscriptionStartDate,
// //     subscriptionEndDate,
// //     status: 'subscribed'
// //   };

// //   fs.writeFileSync('subscription.json', JSON.stringify(newData));

// //   res.json({ message: 'Yearly subscription successful', data: newData });
// // });

// // Endpoint to register for yearly subscription
// app.post('/subscribe-yearly', (req, res) => {
//   const { email } = req.body;
//   const subscriptionStartDate = new Date();
//   const subscriptionEndDate = new Date(subscriptionStartDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 365 days from now

//   const newSubscription = {
//     email,
//     subscriptionStartDate,
//     subscriptionEndDate,
//     status: 'subscribed'
//   };

//   const filePath = path.join(__dirname, 'subscription.json');

//   fs.readFile(filePath, 'utf8', (err, data) => {
//     let subscriptions = [];
//     if (err) {
//       if (err.code !== 'ENOENT') {
//         return res.status(500).json({ error: 'Failed to read subscription file' });
//       }
//     } else {
//       try {
//         subscriptions = JSON.parse(data);
//         if (!Array.isArray(subscriptions)) {
//           subscriptions = [];
//         }
//       } catch (parseErr) {
//         return res.status(500).json({ error: 'Failed to parse subscription file' });
//       }
//     }

//     // Check if email already exists
//     const emailExists = subscriptions.some(subscription => subscription.email === email);
//     if (emailExists) {
//       return res.status(400).json({ error: 'Email already subscribed' });
//     }

//     subscriptions.push(newSubscription);

//     fs.writeFile(filePath, JSON.stringify(subscriptions, null, 2), (writeErr) => {
//       if (writeErr) {
//         return res.status(500).json({ error: 'Failed to write subscription file' });
//       }
//       res.json({ message: 'Yearly subscription successful', data: newSubscription });
//     });
//   });
// });

// // // API endpoint to get subscription details
// // app.get('/api/subscription', (req, res) => {
// //   const filePath = path.join(__dirname, 'subscription.json');
// //   fs.readFile(filePath, 'utf8', (err, data) => {
// //       if (err) {
// //           return res.status(500).json({ error: 'Failed to read subscription file' });
// //       }
// //       try {
// //           const subscription = JSON.parse(data);
// //           res.json(subscription);
// //       } catch (parseErr) {
// //           res.status(500).json({ error: 'Failed to parse subscription file' });
// //       }
// //   });
// // });

// // API endpoint to get subscription details
// app.get('/api/subscription', (req, res) => {
//   const filePath = path.join(__dirname, 'subscription.json');
//   fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//           return res.status(500).json({ error: 'Failed to read subscription file' });
//       }
//       try {
//           const subscriptions = JSON.parse(data);
//           // Ensure the returned data is an array
//           if (!Array.isArray(subscriptions)) {
//               return res.status(500).json({ error: 'Invalid data format' });
//           }
//           res.json(subscriptions);
//       } catch (parseErr) {
//           res.status(500).json({ error: 'Failed to parse subscription file' });
//       }
//   });
// });

// // API endpoint to get registration details
// app.get('/api/registration', (req, res) => {
//   const filePath = path.join(__dirname, 'registration.json');
//   fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//           return res.status(500).json({ error: 'Failed to read registration file' });
//       }
//       try {
//           const registration = JSON.parse(data);
//           res.json(registration);
//       } catch (parseErr) {
//           res.status(500).json({ error: 'Failed to parse registration file' });
//       }
//   });
// });


// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/company', require('./routes/company'));
// app.use('/api/employee', require('./routes/employee'));
// app.use('/api/subemployee', require('./routes/subemployee'));
// app.use('/api/task', require('./routes/task'));
// app.use('/api/notification', require('./routes/notification'));
// app.use('/api/reminderNotification', require('./routes/reminderNotification'));
// app.use('/api/lead', require('./routes/lead'));
// app.use('/api/record', require('./routes/record'));
// app.use('/api/sales', require('./routes/sales'));
// app.use('/api/salary', require('./routes/salary'));
// app.use('/api/subscriptionRate', require('./routes/subscriptionRate'));
// app.use('/api/files', require('./routes/fileRoutes')); // Adjust the path as needed
// app.use('/api/employee', jwtMiddleware); // Apply middleware to employee-related routes


// app.listen(port, () => {
//   console.log(`Task-Manager backend listening at http://${dbHost}:${port}`);
// });

require('dotenv').config(); // Load environment variables from .env file

const ConnectToMongodb = require('./db');
const express = require('express');
const app = express();
const fs = require('fs');
const passport = require('passport'); // Import Passport
require('./passport-config'); // Import your Passport configuration
const jwtMiddleware = require('./jwtmiddleware');
const path = require('path')
var cors = require('cors');
const dbHost = process.env.DB_HOST;



ConnectToMongodb();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use('/uploads/profile-pictures', express.static(path.join(__dirname, 'uploads', 'profile-pictures')));
app.use('/uploads/LeadPicture', express.static(path.join(__dirname, 'uploads', 'LeadPicture')));
app.use('/uploads/pictures', express.static(path.join(__dirname, 'uploads', 'pictures')));
app.use('/uploads/task-pictures', express.static(path.join(__dirname, 'uploads', 'task-pictures')));
app.use('/uploads/audio', express.static(path.join(__dirname, 'uploads', 'audio')));
app.use(express.static('uploads')); // 'uploads' should be the directory where your images are stored




// Endpoint to register for free trial
// app.post('/register', (req, res) => {
//   const {email } = req.body;
//   const registrationDate = new Date();
//   const registrationEndDate = new Date(registrationDate.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

//   // Save registration data to file
//   const newData = {
//     email,
//     registrationDate,
//     registrationEndDate,
//     status: 'registered'
//   };

//   fs.writeFileSync('registration.json', JSON.stringify(newData));

//   res.json({ message: 'Registration successful', data: newData });
// });

// app.post('/register', (req, res) => {
//   const { email } = req.body;
//   const registrationDate = new Date();
//   const registrationEndDate = new Date(registrationDate.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

//   const newRegistration = {
//     email,
//     registrationDate,
//     registrationEndDate,
//     status: 'registered'
//   };

//   const filePath = path.join(__dirname, 'registration.json');

//   fs.readFile(filePath, 'utf8', (err, data) => {
//     let registrations = [];
//     if (err) {
//       if (err.code !== 'ENOENT') {
//         return res.status(500).json({ error: 'Failed to read registration file' });
//       }
//     } else {
//       try {
//         registrations = JSON.parse(data);
//         if (!Array.isArray(registrations)) {
//           registrations = [];
//         }
//       } catch (parseErr) {
//         return res.status(500).json({ error: 'Failed to parse registration file' });
//       }
//     }

//     // Check if email already exists
//     const emailExists = registrations.some(registration => registration.email === email);
//     if (emailExists) {
//       return res.status(400).json({ error: 'Email already registered' });
//     }

//     registrations.push(newRegistration);

//     fs.writeFile(filePath, JSON.stringify(registrations, null, 2), (writeErr) => {
//       if (writeErr) {
//         return res.status(500).json({ error: 'Failed to write registration file' });
//       }
//       res.json({ message: 'Registration successful', data: newRegistration });
//     });
//   });
// });
app.post('/register', (req, res) => {
  const { email } = req.body;
  const registrationDate = new Date();
  const registrationEndDate = new Date(registrationDate.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

  const newRegistration = {
    email,
    registrationDate,
    registrationEndDate,
    status: 'registered'
  };

  const filePath = path.join(__dirname, 'registration.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let registrations = [];
    if (err) {
      if (err.code !== 'ENOENT') {
        return res.status(500).json({ error: 'Failed to read registration file' });
      }
    } else if (data) {
      try {
        registrations = JSON.parse(data);
        if (!Array.isArray(registrations)) {
          registrations = [];
        }
      } catch (parseErr) {
        // If parsing fails, reinitialize registrations to an empty array
        registrations = [];
      }
    }

    // Check if email already exists
    const emailExists = registrations.some(registration => registration.email === email);
    if (emailExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    registrations.push(newRegistration);

    fs.writeFile(filePath, JSON.stringify(registrations, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: 'Failed to write registration file' });
      }
      res.json({ message: 'Registration successful', data: newRegistration });
    });
  });
});


// // Endpoint to register for yearly subscription
// app.post('/subscribe-yearly', (req, res) => {
//   const { email } = req.body;
//   const subscriptionStartDate = new Date();
//   const subscriptionEndDate = new Date(subscriptionStartDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 365 days from now

//   // Save subscription data to file
//   const newData = {
//     email,
//     subscriptionStartDate,
//     subscriptionEndDate,
//     status: 'subscribed'
//   };

//   fs.writeFileSync('subscription.json', JSON.stringify(newData));

//   res.json({ message: 'Yearly subscription successful', data: newData });
// });

// Endpoint to register for yearly subscription
app.post('/subscribe-yearly', (req, res) => {
  const { email } = req.body;
  const subscriptionStartDate = new Date();
  const subscriptionEndDate = new Date(subscriptionStartDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 365 days from now

  const newSubscription = {
    email,
    subscriptionStartDate,
    subscriptionEndDate,
    status: 'subscribed'
  };

  const filePath = path.join(__dirname, 'subscription.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let subscriptions = [];
    if (err) {
      if (err.code === 'ENOENT') {
        // File does not exist, initialize an empty array
        subscriptions = [];
      } else {
        // Other errors while reading the file
        return res.status(500).json({ error: 'Failed to read subscription file' });
      }
    } else {
      try {
        // Try to parse the file content
        subscriptions = JSON.parse(data);
        if (!Array.isArray(subscriptions)) {
          // If parsed data is not an array, initialize an empty array
          subscriptions = [];
        }
      } catch (parseErr) {
        // If parsing fails, initialize an empty array
        subscriptions = [];
      }
    }

    // Check if email already exists
    const emailExists = subscriptions.some(subscription => subscription.email === email);
    if (emailExists) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    // Add the new subscription to the array
    subscriptions.push(newSubscription);

    // Write the updated array back to the file
    fs.writeFile(filePath, JSON.stringify(subscriptions, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: 'Failed to write subscription file' });
      }
      res.json({ message: 'Yearly subscription successful', data: newSubscription });
    });
  });
});
// // API endpoint to get subscription details
// app.get('/api/subscription', (req, res) => {
//   const filePath = path.join(__dirname, 'subscription.json');
//   fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//           return res.status(500).json({ error: 'Failed to read subscription file' });
//       }
//       try {
//           const subscription = JSON.parse(data);
//           res.json(subscription);
//       } catch (parseErr) {
//           res.status(500).json({ error: 'Failed to parse subscription file' });
//       }
//   });
// });

// API endpoint to get subscription details
app.get('/api/subscription', (req, res) => {
  const filePath = path.join(__dirname, 'subscription.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read subscription file' });
    }
    try {
      const subscriptions = JSON.parse(data);
      // Ensure the returned data is an array
      if (!Array.isArray(subscriptions)) {
        return res.status(500).json({ error: 'Invalid data format' });
      }
      res.json(subscriptions);
    } catch (parseErr) {
      res.status(500).json({ error: 'Failed to parse subscription file' });
    }
  });
});

// API endpoint to get registration details
app.get('/api/registration', (req, res) => {
  const filePath = path.join(__dirname, 'registration.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read registration file' });
    }
    try {
      const registration = JSON.parse(data);
      res.json(registration);
    } catch (parseErr) {
      res.status(500).json({ error: 'Failed to parse registration file' });
    }
  });
});

// Endpoint to get registration details based on email
app.get('/admRegistration', (req, res) => {
  const email = req.query.email;
  
  if (!email) {
    return res.status(400).json({ error: 'Email query parameter is required' });
  }

  const filePath = path.join(__dirname, 'registration.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading registration data' });
    }

    const registrations = JSON.parse(data);
    const registration = registrations.find(reg => reg.email === email);

    if (registration) {
      res.json(registration);
    } else {
      res.status(404).json({ error: 'Registration not found' });
    }
  });
});

// Endpoint to get subscription details based on email
app.get('/admSubscription', (req, res) => {
  const email = req.query.email;
  
  if (!email) {
    return res.status(400).json({ error: 'Email query parameter is required' });
  }

  const filePath = path.join(__dirname, 'subscription.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading subscription data' });
    }

    const subscriptions = JSON.parse(data);
    const subscription = subscriptions.find(reg => reg.email === email);

    if (subscription) {
      res.json(subscription);
    } else {
      res.status(404).json({ error: 'Subscription not found' });
    }
  });
});

app.patch('/update-subscription', (req, res) => {
  const { email } = req.body;
  const subscriptionStartDate = new Date();
  const subscriptionEndDate = new Date(subscriptionStartDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 365 days from now

  const filePath = path.join(__dirname, 'subscription.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let subscriptions = [];
    if (err) {
      if (err.code !== 'ENOENT') {
        return res.status(500).json({ error: 'Failed to read subscription file' });
      }
    } else {
      try {
        subscriptions = JSON.parse(data);
        if (!Array.isArray(subscriptions)) {
          subscriptions = [];
        }
      } catch (parseErr) {
        return res.status(500).json({ error: 'Failed to parse subscription file' });
      }
    }

    // Check if email exists
    const subscriptionIndex = subscriptions.findIndex(subscription => subscription.email === email);
    if (subscriptionIndex === -1) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Check if subscription end date is less than the current date
    const currentEndDate = new Date(subscriptions[subscriptionIndex].subscriptionEndDate);
    if (currentEndDate > subscriptionStartDate) {
      return res.status(400).json({ error: 'Subscription is still active, cannot renew' });
    }

    // Update subscription dates
    subscriptions[subscriptionIndex].subscriptionStartDate = subscriptionStartDate;
    subscriptions[subscriptionIndex].subscriptionEndDate = subscriptionEndDate;

    fs.writeFile(filePath, JSON.stringify(subscriptions, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: 'Failed to write subscription file' });
      }
      res.json({ message: 'Subscription updated successfully', data: subscriptions[subscriptionIndex] });
    });
  });
});


app.use('/api/auth', require('./routes/auth'));
app.use('/api/company', require('./routes/company'));
app.use('/api/employee', require('./routes/employee'));
app.use('/api/subemployee', require('./routes/subemployee'));
app.use('/api/task', require('./routes/task'));
app.use('/api/notification', require('./routes/notification'));
app.use('/api/reminderNotification', require('./routes/reminderNotification'));
app.use('/api/lead', require('./routes/lead'));
app.use('/api/record', require('./routes/record'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/salary', require('./routes/salary'));
app.use('/api/subscriptionRate', require('./routes/subscriptionRate'));
app.use('/api/gateWayIp', require('./routes/gateWayIp'));
app.use('/api/manageip', require('./routes/manageip'));
app.use('/api/location', require('./routes/location'));
app.use('/api/files', require('./routes/fileRoutes')); // Adjust the path as needed
app.use('/api/employee', jwtMiddleware); // Apply middleware to employee-related routes


app.listen(port, () => {
  console.log(`Task-Manager backend listening at http://${dbHost}:${port}`);
});