const mongoose = require("mongoose")

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "seller"
    },
    shopName: {
        type: String,
        unique: true,
        required: true
    }
});

<<<<<<< HEAD
module.exports = mongoose.model("Seller", sellerSchema)
=======
moduleexports = mongoose.model("Seller", sellerSchema)
>>>>>>> 2b7ddec0fdeaf5b3c5832516ee1d8fae3edd2787
