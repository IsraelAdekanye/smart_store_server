const { ProductQueryAndLogic } = require("../db/productDatabase");
const { FormateData } = require("../utils");

// All Business logic will be here
class ProductService {
    
    constructor(){
        this.logic = new ProductQueryAndLogic();
    }

    async CreateProduct(productInputs){

        const productResult = await this.logic.CreateProduct(productInputs)
        return FormateData(productResult);
    }
    
    async GetProducts(){
        const products = await this.logic.Products();

        let categories = {};

        products.map(({ type }) => {
            categories[type] = type;
        });
        
        return FormateData({
            products,
            categories:  Object.keys(categories)  
           })

    }

    async GetProductDescription(productId){
        
        const product = await this.logic.FindById(productId);
        return FormateData(product)
    }

    async GetProductsByCategory(category){

        const products = await this.logic.FindByCategory(category);
        return FormateData(products)

    }

    async GetSelectedProducts(selectedIds){
        
        const products = await this.logic.FindSelectedProducts(selectedIds);
        return FormateData(products);
    }

    async GetProductPayload(userId,{ productId, qty },event){

         const product = await this.logic.FindById(productId);

        if(product){
             const payload = { 
                event: event,
                data: { userId, product, qty}
            };
 
             return FormateData(payload)
        }else{
            return FormateData({error: 'No product Available'});
        }

    }
 

}

module.exports = ProductService;
