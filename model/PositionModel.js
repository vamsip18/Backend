const {model}=require('mongoose');

const PositionsSchema=require('../Schemas/PositionsSchema');

const PositionModel=model("Position",PositionsSchema);

module.exports=PositionModel;