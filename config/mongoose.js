const mongoose = require("mongoose");

const connectDB = async (DATABSAE_URL) => {
try {
    
    await mongoose.connect(DATABSAE_URL);
    console.log("mongo dm connect up...")
    
} catch (error) {
    console.log("error")
    
}
}

module.exports = connectDB

