const db = require("../db");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class Cart{

    constructor(){
        this.tax= 0.0725
    }

    computeTotal({cart, menus}){
        let total=0

        for (const [id, quantity] of cart){
            const item_details= menus.find(id)
            total+= (toFloat(item_details.cost)*quantity)
        }

        return total*0.0725

    }
}

module.exports= Cart