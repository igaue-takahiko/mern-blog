const mongoose = require("mongoose");
require('dotenv').config();

module.exports = connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connection created.");
    return response
  } catch (error) {
    console.log(error);
  }
};
