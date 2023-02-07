const mongoose = require('mongoose');
const { DB_URL } = require('../config');
const queryAndLogic = require('./Queries & Logic')

const connection = async() => {

    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Db Connected');
        
    } catch (error) {
        console.error('Error ============ ON DB Connection')
        console.log(error);
    }
 
};

module.exports = {}
 
