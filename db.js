// require('dotenv').config(); // Load environment variables from .env file


// // First step is to connect with our database
// const mongoose = require('mongoose')
// mongoURI = process.env.MONGO_URI


// const ConnectToMongodb = (() => {
//     mongoose.connect(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//         .then(() => {
//             console.log("Connected to Mongo Successfully")
//         }).catch((e) => {
//             console.log(e)
//         })
// })

// module.exports = ConnectToMongodb



require('dotenv').config(); // Load environment variables from .env file

// First step is to connect with our database
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI

const ConnectToMongodb = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo Successfully");
    } catch (e) {
        console.log(e);
    }
}

module.exports = ConnectToMongodb;