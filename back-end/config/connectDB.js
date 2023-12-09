const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Myproject", {
      useNewUrlParser: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect successfully");
  } catch (error) {
    console.log("connect failure");
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
