const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected ${connect.connection.host}`.cyan);
  } catch (err) {
    console.log(`Message: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
