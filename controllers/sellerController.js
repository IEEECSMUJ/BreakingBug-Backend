const bcrypt = require('bcrypt');
const Seller = require('../models/sellerSchema.js');
const createNewToken = require('../utils/token.js');

const sellerRegister = async (req, res) => {
    try {
        const { email, password, name, shopName } = req.body;
        if(!(email && password && name && shopName)) {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);

            const seller = new Seller({
                ...req.body,
                password: hashedPass
                // added hashed password
            });

            const existingSellerByEmail = await Seller.findOne({ email: req.body.email });
            const existingShop = await Seller.findOne({ shopName: req.body.shopName });

            if (existingSellerByEmail) {
                res.status(409).json({success: false, message: "Seller account already exists"});
                // added proper message and api consistency
            }
            else if (existingShop) {
                res.status(409).json({success: false, message: "Shop already exists"});
                // added proper message and api consistency
            }
            else {
                let result = await Seller.create(seller);
                result.password = undefined;

                const token = createNewToken(result._id)

                result = {
                    ...result._doc,
                    token
                };
                
                // added proper message and api consistency
                res.status(200).json({success: true, message: 'Seller Account Created.', result});
            }
        } else {
            res.status(401).json({success: false, message: 'Please provide the necessary details for accoutn creation!'});
            // added proper message and api consistency
        }
    } catch (err) {
        res.status(500).json({success: false, message: 'Internal Server Error.', err});
    }
};

const sellerLogIn = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            let seller = await Seller.findOne({ email: req.body.email });
            if (seller) {
                const validated = await bcrypt.compare(req.body.password, seller.password);
                if (validated) {
                    seller.password = undefined;

                    const token = createNewToken(seller._id)

                    seller = {
                        ...seller._doc,
                        token
                        // tokens->token
                    };

                    res.status(200).json({success: true, message: 'Seller LogIn successful!'})
                    // added proper message and api consistency
                } else {
                    res.status(401).json({success: false, message: 'Invalid email or password!'});
                    // added proper message and api consistency
                }
            } else {
                res.status(404).json({success: false, message: 'Seller account not found. Please signup.'})
                // added proper message and api consistency
            }
        } else {
            res.status(401).json({success: false, message: 'Email and Password are required for login!'});
            // added proper message and api consistency
        }
    } catch (err) {
        res.status(500).json({success: false, message: 'Internal Server Error.', err});
    }
};

module.exports = { sellerRegister, sellerLogIn };
