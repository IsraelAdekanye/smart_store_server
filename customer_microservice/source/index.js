const express = require('express');
const cors  = require('cors');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const customer = require('./api/customer');
const { CreateChannel } = require('./utils');


app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + '/public'))

const StartServer = async() => {

    const app = express();
    
    await databaseConnection();

    const channel = await CreateChannel()
    
    customer(app, channel);

    app.listen(PORT, () => {
          console.log(`listening to port ${PORT}`);
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