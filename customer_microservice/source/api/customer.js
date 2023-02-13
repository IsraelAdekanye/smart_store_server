const CustomerService = require('../service/customerService');
const  UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');

module.exports = (app, channel) => {
    
    const service = new CustomerService();

    SubscribeMessage(channel, service);


    app.post('/signup', async (req,res,next) => {
        const { email, password, phone } = req.body;
        const { data } = await service.SignUp({ email, password, phone}); 
        res.json(data);

    });

    

    
     

    
     

    
    
    

    
}
