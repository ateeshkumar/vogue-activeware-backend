const mongoose = require("mongoose");

const DB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Database connected successfully ${connection.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = DB;
