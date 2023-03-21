const express = require('express');
const cors  = require('cors');
const { PORT } = require('./config/index');
const { databaseConnection } = require('./db/customerDatabase');
const customer = require('./api/customer');
const { CreateChannel } = require('./utils');




const StartServer = async() => {

    const app = express();

    app.use(cors());

    app.use(express.json());

    app.use(express.static(__dirname + '/public'))

    await databaseConnection();

    const channel = await CreateChannel()
    
    customer(app, channel);


    app.listen(PORT, () => {
          console.log(`Customer Service is listening for requests on port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
        channel.close();
    })
    

}

StartServer();