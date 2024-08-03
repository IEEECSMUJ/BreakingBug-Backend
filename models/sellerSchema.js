const mongoose = require("mongoose");

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
        default: "seller",
    },
    shopName: {
        type: String,
        unique: true,
        required: true,
    }
});

// should be module.exports
module.exports = mongoose.model("Seller", sellerSchema); // Changed from selle to Seller
