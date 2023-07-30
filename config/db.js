const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false)
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongo connect")
  } catch (e) {
    console.log(e)
    process.exit()
  }
}

module.exports = connectDb
