require('dotenv').config();
const MAIL_ID=process.env.MAIL_ID
const MAIL_PASS=process.env.MAIL_PASS

const nodemailer = require('nodemailer');

// Create a transporter with your email provider's settings
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email provider (e.g., 'Gmail', 'Outlook')
    auth: {
        user: MAIL_ID, // Your email address
        pass: MAIL_PASS, // Your email password (consider using environment variables)
    },
});

module.exports = transporter;








// router.post('/clock-ins', jwtMiddleware, async (req, res) => {
//     const company = req.user.adminCompanyName;
//     const { email, role, ip, lat, long } = req.body;
//     const now = new Date();
  
//     let coordinates;
  
//     if (role === 'Sales Employee') {
//       coordinates = {
//         lat,
//         long
//       };
//     } else {
//       const validIPs = readIPAddressesed(company);
//       if (validIPs.includes(ip)) {
//         coordinates = {
//           lat,
//           long
//         };
//       } else {
//         return res.status(403).json({ message: 'Invalid work location tracked' });
//       }
//     }
  
//     if (!coordinates) {
//       return res.status(500).json({ message: 'Failed to get location' });
//     }
  
//     try {
//       const salary = await Salary.findOne({ email });
//       if (!salary) {
//         return res.status(404).json({ message: 'Employee not found' });
//       }
  
//       // Check for existing clockIn record on the same day
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//       const existingRecord = salary.clockRecords.find(record => {
//         const recordDate = new Date(record.clockIn);
//         return recordDate >= today && recordDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
//       });
  
//       if (existingRecord) {
//         // Update existing record with new clockIn time
//         existingRecord.clockIn = now;
//         existingRecord.clockInCoordinates = coordinates;
//         existingRecord.clockOut = null;
//         existingRecord.clockOutCoordinates = null;
//         existingRecord.workDuration = null;
//       } else {
//         // Create a new clockIn record
//         salary.clockRecords.push({
//           clockIn: now,
//           clockInCoordinates: coordinates,
//           clockOut: null,
//           clockOutCoordinates: null,
//           workDuration: null
//         });
//       }
  
//       await salary.save();
  
//       res.status(200).json({ message: 'Clocked in successfully' });
//     } catch (error) {
//       console.error('Error saving clock record:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  
  
  
  
  
  
//   router.post('/clock-outs', jwtMiddleware, async (req, res) => {
//     const company = req.user.adminCompanyName
//     const { email, role, ip, lat, long } = req.body;
//     const l = lat;
//     const lo = long;
//     //const now = new Date("2024-06-25T14:06:20.143+00:00");
//     const now = new Date();
//     console.log(now)
//     // Static coordinates for testing
//     let coordinates;
  
//     if (role === 'Sales Employee') {
//       coordinates = {
//         lat: l,
//         long: lo
//       };
//     } else {
//       const validIPs = readIPAddressesed(company);
//       if (validIPs.includes(ip)) {
//         coordinates = {
//           lat: l,
//           long: lo
//         };
//       } else {
//         return res.status(403).json({ message: 'Invalid work location tracked' });
//       }
//     }
  
//     console.log(coordinates);
  
//     if (!coordinates) {
//       return res.status(500).json({ message: 'Failed to get location' });
//     }
  
//     try {
//       const salary = await Salary.findOne({ email });
//       if (!salary) {
//         return res.status(404).json({ message: 'Employee not found' });
//       }
  
//       const lastClockRecord = salary.clockRecords[salary.clockRecords.length - 1];
  
//       if (!lastClockRecord || !lastClockRecord.clockIn) {
//         return res.status(400).json({ message: 'No active clock-in found' });
//       }
  
//       const workDuration = (now - new Date(lastClockRecord.clockIn)) / (1000 * 60 * 60); // Duration in hours
//       console.log('Calculated work duration:', workDuration);
  
//       lastClockRecord.clockOut = now;
//       lastClockRecord.clockOutCoordinates = coordinates;
//       lastClockRecord.workDuration = workDuration;
  
//       await salary.save();
  
//       res.status(200).json({ message: 'Clocked out successfully' });
//     } catch (error) {
//       console.error('Error during clock-out:', error);
//       res.status(500).json({ message: error.message });
//     }
//   });
  
// router.post('/create', upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), [
//     // Validation rules using express-validator
//     body('title').notEmpty().withMessage('Title is required'),
//     body('description').notEmpty().withMessage('Description is required'),
//     body('assignTo').custom(value => {
//       if (!Array.isArray(value) && typeof value !== 'string') {
//         throw new Error('Assignees are required');
//       }
//       return true;
//     }),
//     body('startDate').notEmpty().withMessage('Start Date is required'),
//     body('deadlineDate').notEmpty().withMessage('Deadline Date is required'),
//     body('startTime').notEmpty().withMessage('Start Time is required'),
//     body('endTime').notEmpty().withMessage('End Time is required'),
//   ], jwtMiddleware, async (req, res) => {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
  
//     const { title, description, startDate, startTime, deadlineDate, reminderDate, endTime, reminderTime, assignTo } = req.body;
  
//     let assignToArray;
//     if (Array.isArray(assignTo)) {
//       assignToArray = assignTo;
//     } else if (typeof assignTo === 'string') {
//       assignToArray = [assignTo];
//     } else {
//       return res.status(400).json({ error: 'Invalid assignTo format' });
//     }
  
//     console.log(req.body);
//     let picturePath; // Initialize picturePath as undefined
//     let audioPath; // Initialize audioPath as undefined
  
//     // Check if picture and audio files were included in the request
//     if (req.files && req.files.picture) {
//       picturePath = req.files.picture[0].path;
//     }
  
//     if (req.files && req.files.audio) {
//       audioPath = req.files.audio[0].path;
//     }
  
//     try {
//       const assignedBy = req.user.employeeId;
  
//       // Validate if the specified employees exist
//       const employees = await SubEmployee.find({ _id: { $in: assignToArray } });
//       if (employees.length !== assignToArray.length) {
//         const nonExistentEmployees = assignToArray.filter(empId => !employees.map(emp => emp._id.toString()).includes(empId));
//         return res.status(404).json({ error: `Employees with IDs ${nonExistentEmployees.join(', ')} not found` });
//       }
  
//       const tasks = assignToArray.map(assigneeId => {
//         const employee = employees.find(emp => emp._id.toString() === assigneeId);
//         return new Task({
//           title,
//           description,
//           startDate,
//           startTime,
//           deadlineDate,
//           reminderDate,
//           endTime,
//           reminderTime,
//           assignTo: employee._id,
//           assignedBy,
//           phoneNumber: employee.phoneNumber,
//           picture: picturePath,
//           audio: audioPath,
//         });
//       });
  
//       await Task.insertMany(tasks);
//       res.status(201).json({ message: 'Tasks created successfully', tasks });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  