const mongoose = require("mongoose");
const { DB_URL } = require("../config");
const ProductQueryAndLogic = require("./queries & logic/productQuery_Logic");

const databaseConnection = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Db Connected");
  } catch (error) {
    console.log("Error ============");
    console.log(error);
  }
};

module.exports = {
    databaseConnection, ProductQueryAndLogic
}