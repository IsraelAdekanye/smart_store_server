const mongoose = require('mongoose');
const { DB_URL } = require('../config');
const CustomerQueryAndLogic = require('./Queries & Logic/customerQuery_Logic');

const databaseConnection = async() => {

    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Db Connected');
        
    } catch (error) {
        console.log(DB_URL);
        console.error('Error ============ ON DB Connection')
        console.log(error);
    }
 
};

module.exports = {
    databaseConnection, CustomerQueryAndLogic
}
 
