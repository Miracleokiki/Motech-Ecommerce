const mongoose = require ("mongoose");
//VALIDATING MONGODB
const validateMongoDbId = (id) => {
    const isvalid = mongoose.Types.ObjectId.isValid(id);
    if(!isvalid) throw new Error("This id is not valid or not found");
};
module.exports = validateMongoDbId;