const bcrypt = require('bcrypt');
const Seller = require('../models/sellerSchema.js');
const { createNewToken } = require('../utils/token.js');

// maintained api response consistency by changing .send to .json and did proper api response on error

const sellerRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const seller = new Seller({
            ...req.body,
            password: hashedPass //  Corrected from bcrypt.hash to hashedPass
        });

        const existingSellerByEmail = await Seller.findOne({ email: req.body.email });
        const existingShop = await Seller.findOne({ shopName: req.body.shopName });

        if (existingSellerByEmail) {
            res.json({ status: 'info', message: 'Email already exists' }); 
        } else if (existingShop) {
            res.json({ status: 'info', message: 'Shop name already exists' }); 
        } else {
            let result = await seller.save();
            result.password = undefined;

            const token = createNewToken(result._id);

            result = {
                ...result._doc,
                token: token
            };

            res.json({ status: 'success', data: result }); 
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message }); 
    }
};

const sellerLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let seller = await Seller.findOne({ email: req.body.email });
        if (seller) {
            const validated = await bcrypt.compare(req.body.password, seller.password);
            if (validated) {
                seller.password = undefined;

                const token = createNewToken(seller._id);

                seller = {
                    ...seller._doc,
                    token: token //  Corrected from tokens to token
                };

                res.json({ status: 'success', data: seller }); 
            } else {
                res.json({ status: 'info', message: "Invalid password" }); 
            }
        } else {
            res.json({ status: 'info', message: "User not found" }); 
        }
    } else {
        res.json({ status: 'info', message: "Email and password are required" }); 
    }
};

module.exports = { sellerRegister, sellerLogIn };
