const { CustomerQueryAndLogic } = require("../db/customerDatabase");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');

class CustomerService {

    constructor() {
        this.logic = new CustomerQueryAndLogic()
    }
}