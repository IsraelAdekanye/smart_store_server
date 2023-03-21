const express = require('express');
const cors = require("cors");
const { PRODUCT_PORT } = require('./config');
const { databaseConnection } = require('./db/productDatabase');
const { products } = require("./api/products");

const { CreateChannel } = require("./utils");

const StartServer = async() => {

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + "/public"));

    const channel = await CreateChannel();

    products(app, channel);
    
    await databaseConnection();

    app.listen(PRODUCT_PORT, () => {
        console.log(`listening to port ${PRODUCT_PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })

}

StartServer();
