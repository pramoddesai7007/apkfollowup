const express = require("express");
const ReminderNotification = require("../models/ReminderNotification");
const jwtMiddleware = require("../jwtmiddleware");
const router = express.Router();
const { DateTime } = require("luxon");
const SubEmployee = require("../models/SubEmployee");
const Employee = require("../models/Employee");
const axios = require("axios");

router.post("/create", jwtMiddleware, async (req, res) => {
  try {
    const adminId = req.user.employeeId; // Get the ID of the admin creating the task
    const employeeId = req.user.subEmployeeId; // Get the ID of the admin creating the task
    const assignedByname = req.user.name; // Get the assignedByname from req.user
    const {
      recipientId,
      taskId,
      message,
      title,
      description,
      startDate,
      deadlineDate,
      reminderDate,
      startTime,
      endTime,
      status,
      reminderTime,
    } = req.body;

    const recipient = await SubEmployee.findById(recipientId);

    if (!recipient) {
      recipient = await Employee.findById(recipientId);
    }
    
    if (!recipient) {
      return res.status(404).send('Recipient not found');
    }

    // Create a new notification with both userId (admin) and recipientId (dynamically determined)
    const notification = new ReminderNotification({
      userId: adminId ? adminId : employeeId, // ID of the admin creating the task
      recipientId, // Dynamically determined recipient ID
      taskId, // ID of the newly created task
      message,
      assignedByname, // Dynamically determined name
      title,
      description,
      startDate,
      deadlineDate,
      reminderDate,
      startTime,
      endTime,
      reminderTime,
      status,
      phoneNumber: recipient.phoneNumber, // Add phoneNumber from the recipient's details
    });

    // Save the task and notification to the database
    await notification.save();

    res.status(201).json({ message: "Reminder Notification set successfully" });
  } catch (error) {
    console.error("Error creating task and notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/notifications", jwtMiddleware, async (req, res) => {
  try {
    const subEmployeeId = req.user.subEmployeeId;

    // Get the current date and time
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

    const currentDateTime = DateTime.now().setZone("Asia/Kolkata");
    const currentTime = currentDateTime.toFormat("hh:mm a");
    
    // console.log("Current Date:", currentDate);
    // console.log("Current Time:", currentTime);

    // Find tasks where the reminder date and time match the current date and time
    const tasks = await ReminderNotification.find({
      recipientId: subEmployeeId,
      reminderDate: currentDate,
      reminderTime: currentTime,
      status: "Pending",
      isRead: false,
    });

    // console.log("Tasks with near reminder date and time:", tasks);

    if (!tasks || tasks.length === 0) {
      // console.log("No tasks found.");
      return res.status(404).json({ error: "No tasks found" });
    }

    // Return the list of tasks as a JSON response
    // console.log(tasks);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




router.get("/reminder", jwtMiddleware, async (req, res) => {
  try {
    const employeeId = req.user.employeeId;
    // console.log(employeeId)

    // Get the current date and time
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

    const currentDateTime = DateTime.now().setZone("Asia/Kolkata");
    const currentTime = currentDateTime.toFormat("hh:mm a");
    
    // console.log("Current Date:", currentDate);
    // console.log("Current Time:", currentTime);

    // Find tasks where the reminder date and time match the current date and time
    const tasks = await ReminderNotification.find({
      recipientId: employeeId,
      reminderDate: currentDate,
      reminderTime: currentTime,
      status: "Pending",
      isRead: false,
    });

    // console.log("Tasks with near reminder date and time:", tasks);

    if (!tasks || tasks.length === 0) {
      // console.log("No tasks found.");
      return res.status(404).json({ error: "No tasks found" });
    }

    // Return the list of tasks as a JSON response
    // console.log(tasks);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get("/notifications", async (req, res) => {
//     try {
//         // const subEmployeeId = req.user.subEmployeeId;

//         // Get the current time
//         const currentTime = DateTime.now().setZone("Asia/Kolkata");
//         console.log(currentTime.toFormat("hh:mm a"));

//         // Find tasks where the reminder time matches the current time
//         const tasks = await ReminderNotification.find({
//             // recipientId: subEmployeeId,
//             reminderTime: currentTime.toFormat("hh:mm a"),
//             status: "Pending",
//             isRead: false
//         });

//         console.log("Tasks with near reminder time:", tasks);

//         if (!tasks || tasks.length === 0) {
//             console.log("No tasks found.");
//             return res.status(404).json({ error: "No tasks found" });
//         }

//         for (const task of tasks) {
//             await sendNotification(
//                 task.description,
//                 task.status,
//                 task.startDate,
//                 task.startTime,
//                 task.deadlineDate,
//                 task.endTime,
//                 task.assignedByname,
//                 task.phoneNumber // Assuming phoneNumber is a field in your task
//             );

//             // Optionally, update the task to mark the notification as sent
//             task.isRead = true;
//             await task.save();
//         }

//         // Return the list of tasks as a JSON response
//         res.status(200).json({ tasks });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

router.get("/notification", jwtMiddleware, async (req, res) => {
  try {
    const subEmployeeId = req.user.employeeId;

    // Retrieve notifications for the subemployee with the specified subEmployeeId
    const notifications = await ReminderNotification.find({
      recipientId: subEmployeeId,
      isRead: false,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// PUT route to mark a notification as read when clicking on a task
router.put("/:notificationId/read", async (req, res) => {
  try {
    const notificationId = req.params.notificationId;

    // Find the notification by its ID
    const notification = await ReminderNotification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Mark the notification as read
    notification.isRead = true;

    // Save the updated notification
    await notification.save();

    res.json(notification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function sendNotification(
  description,
  status,
  sdate,
  stime,
  ddate,
  etime,
  assBy,
  phoneNumber
) {
  const url = "https://sms.visionhlt.com/api/mt/SendSMS";
  //const message = `Dear {#var#}, your billing amount is {#var#}. Status: {#var#}.`;
  const message = `{#var#}, your status is {#var#}. Start Date: {#var#}. Start Time: {#var#}. Deadline Date: {#var#}. End Time: {#var#}. Assigned By: {#var#}.`;

  const params = {
    apikey: "5kh67tSaKUmfYP27sEXsEA", // Your API key provided by VisionHlt
    senderid: "VISHLT", // Your sender ID provided by VisionHlt
    channel: "Trans",
    DCS: 0,
    flashsms: 0,
    number: phoneNumber,
    text: message,
    variables: `${description},${status},${sdate},${stime},${ddate},${etime},${assBy}`,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    throw new Error("Failed to send SMS: " + error.message);
  }
}

// Create the GET API endpoint
router.get("/send-notification", async (req, res) => {
  const {
    description,
    status,
    sdate,
    stime,
    ddate,
    etime,
    assBy,
    phoneNumber,
  } = req.query;

  if (
    !description ||
    !status ||
    !sdate ||
    !stime ||
    !ddate ||
    !etime ||
    !assBy ||
    !phoneNumber
  ) {
    return res.status(400).send("Missing required query parameters");
  }

  try {
    const result = await sendNotification(
      description,
      status,
      sdate,
      stime,
      ddate,
      etime,
      assBy,
      phoneNumber
    );
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
