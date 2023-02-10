const { CustomerQueryAndLogic } = require("../db/customerDatabase");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');

class CustomerService {

    constructor() {
        this.logic = new CustomerQueryAndLogic()
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;
        
        const existingCustomer = await this.logic.FindCustomer({ email});

        if(existingCustomer){
            
            const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
            if(validPassword){
                const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                return FormateData({id: existingCustomer._id, token });
            }
        }

        return FormateData(null);
    }

    async SignUp(userInputs){
        
        const { email, password, phone } = userInputs;
        
        // create salt
        let salt = await GenerateSalt();
        
        let userPassword = await GeneratePassword(password, salt);
        
        const existingCustomer = await this.logic.CreateCustomer({ email, password: userPassword, phone, salt});
        
        const token = await GenerateSignature({ email: email, _id: existingCustomer._id});
        return FormateData({id: existingCustomer._id, token });

    }

    async AddNewAddress(_id,userInputs){
        
        const { street, postalCode, city,country} = userInputs;
    
        const addressResult = await this.logic.CreateAddress({ _id, street, postalCode, city,country})

        return FormateData(addressResult);
    }

    async GetProfile(id){

        const existingCustomer = await this.logic.FindCustomerById({id});
        return FormateData(existingCustomer);
    }

    async GetShopingDetails(id){

        const existingCustomer = await this.logic.FindCustomerById({id});

        if(existingCustomer){
            // const orders = await this.shopingRepository.Orders(id);
           return FormateData(existingCustomer);
        }       
        return FormateData({ msg: 'Error'});
    }

    async GetWishList(customerId){
        const wishListItems = await this.repository.Wishlist(customerId);
        return FormateData(wishListItems);
    }

    async AddToWishlist(customerId, product){
        const wishlistResult = await this.logic.AddWishlistItem(customerId, product);        
       return FormateData(wishlistResult);
   }
}