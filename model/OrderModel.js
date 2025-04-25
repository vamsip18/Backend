const {model}=require('mongoose');

const OrdersSchema=require('../Schemas/OrdersSchema');

const OrderModel=model("Order",OrdersSchema);

module.exports=OrderModel;