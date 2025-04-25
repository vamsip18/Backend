const {model}=require('mongoose');

const HoldingsSchema=require('../Schemas/HoldingsSchema');

const HoldingModel=model("Holding",HoldingsSchema);

module.exports=HoldingModel;