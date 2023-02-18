const mongoose = require('mongoose');
require("dotenv").config();
const CustomerQueryAndLogic = require('./Queries & Logic/customerQuery_Logic');


const databaseConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Db Connected');
        
    } catch (error) {
        console.error('Error ============ ON DB Connection')
        console.log(process.env.MONGODB_URI);
    }
 
};

module.exports = {
    databaseConnection, CustomerQueryAndLogic
}
 
