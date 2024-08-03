const bcrypt = require('bcrypt');
const Customer = require('../models/customerSchema.js');
const createNewToken = require('../utils/token.js');
const { reset } = require('nodemon');
// fixed the import for createNewToken

const customerRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!(name && email && password)) {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);

            const customer = new Customer({
                ...req.body,
                password: hashedPass
            });

            const existingcustomerByEmail = await Customer.findOne({ email: req.body.email });

            if (existingcustomerByEmail) {
                res.status(404).json({success: false, message: "Customer account already exists!"});
                // added proper messaging for api consistency
            }
            else {
                let result = await Customer.create(customer);
                result.password = undefined;
                
                const token = createNewToken(result._id)

                result = {
                    ...result._doc,
                    token: token
                };

                res.status(200).json({success: true, message: 'CUstomer account creation successful!', result});
                // added proper messaging for api consistency
            }
        } else {
            res.status(401).json({success: false, message: 'Please provide the necessary details for account creation.'});
        }
        
    } catch (err) {
        res.status(500).json({success: false, message: 'Internal Server Error', err});
        // added proper messaging for api consistency
    }
};

const customerLogIn = async (req, res) => {
    try{
        if (req.body.email && req.body.password) {
            let customer = await Customer.findOne({ email: req.body.email });
            // changed condition for valid customer
            if (customer) {
                const validated = await bcrypt.compare(req.body.password, customer.password);
                // changed condition check for correct password
                if (validated) {
                    customer.password = undefined;

                    const token = createNewToken(customer._id)

                    customer = {
                        ...customer._doc,
                        token: token
                    };

                    res.status(200).json({success: true, message: 'Customer login successful!'});
                } else {
                    res.json(401).json({success: false, message: 'Invalid email or password.'});
                }
            } else {
                res.status(404).json({success: false, message: 'Customer account not found. Please signup.'});
            }
        } else {
            res.send({ message: "Email and password are required" });
        }
    } catch(err) {
        res.status(500).json({success: false, message: 'Internal Server Error.', err});
    }
};

const getCartDetail = async (req, res) => {
    try {
        let customer = await Customer.findById(req.userId) // authMiddleware adds userId to request
        if (customer) {
            res.status(200).json({success: false, message: 'Customer cart details fetched.', cartDetails: customer.cartDetails});
            // if customer exists, we send the response with proper messaging
        }
        res.status(404).json({success: false, message: 'Customer not found.'});
    } catch (err) {
        res.status(500).json({success: false, message: 'Internal Server Error.', err});
    }
}

const customerUpdate = async (req, res) => {
    try {
        let customer = await Customer.findByIdAndUpdate(req.userId, req.body, { new: true });
        // getting id from token, and sending the new details

        if(customer) {
            return res.status(200).json({success: true, message: 'Customer cart updated!', updatedCart: customer});
            // if customer exists, we update and send the response with proper messaging
        }

        res.status(404).json({success: false, message: 'Customer not found.'});

    } catch (err) {
        res.status(500).json({success: false, message: 'Internal Server Error.', err});
    }
}

module.exports = {
    customerRegister,
    customerLogIn,
    getCartDetail,
    customerUpdate,
};
