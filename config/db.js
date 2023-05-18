const { connect } = require("mongoose");
const logger = require("../src/utils/logger");

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await connect(process.env.MONGO_DB);
    logger.info("Database Connected Successfully");
  } catch (error) {
    logger.error(error);
  }
};
