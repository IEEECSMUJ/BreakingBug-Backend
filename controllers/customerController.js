const bcrypt = require('bcrypt');
const Customer = require('../models/customerSchema.js');
const { createNewToken } = require('../utils/token.js');


// used .json instead of send to maintain consistency in api responses and i have use status,message and data or error to maintain consistency in a api response

const customerRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const customer = new Customer({
            ...req.body,
            password: hashedPass
        });

        const existingCustomerByEmail = await Customer.findOne({ email: req.body.email });

        if (existingCustomerByEmail) {
            return res.status(409).json({ status: 'fail', message: 'Email already exists', data: null }); // Can use 409 status code for User Already Exists also we can also use 400 as it can be stated as a bad request
        } else {
            let result = await customer.save();
            result.password = undefined;

            const token = createNewToken(result._id);

            result = {
                ...result._doc,
                token: token
            };

            return res.status(201).json({ status: 'success', message: 'Customer registered successfully', data: result }); // Should use 201 status code creating a Customer Registeration
        }
    } catch (err) {
        return res.status(500).json({ status: 'error', message: 'Internal server error', error: err.message }); // Did Proper Error Handling with error message
    }
};

const customerLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let customer = await Customer.findOne({ email: req.body.email });
        if (customer) { // Corrected logic to check if customer exists first
            const validated = await bcrypt.compare(req.body.password, customer.password);
            if (validated) { // Corrected validation logic
                customer.password = undefined;

                const token = createNewToken(customer._id);

                customer = {
                    ...customer._doc,
                    token: token
                };

                return res.status(200).json({ status: 'success', message: 'Login successful', data: customer }); // Can Use 200 status code for successful login
            } else {
                return res.status(401).json({ status: 'fail', message: 'Invalid password', data: null }); // Can use 401 status code for unauthorized
            }
        } else {
            return res.status(404).json({ status: 'fail', message: 'User not found', data: null }); // Use 404 status code for not found
        }
    } else {
        return res.status(400).json({ status: 'fail', message: 'Email and password are required', data: null }); // Use 400 status code for bad request
    }
};

const getCartDetail = async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id); // Corrected method name to findById
        if (customer) {
            return res.status(200).json({ status: 'success', message: 'Cart details fetched successfully', data: customer.cartDetails }); // Corrected method name to json instead of get
        } else {
            return res.status(404).json({ status: 'fail', message: 'No customer found', data: null }); // Use 404 status code for not found
        }
    } catch (err) {
        return res.status(500).json({ status: 'error', message: 'Internal server error', error: err.message }); // Did proper error handling with error message
    }
};

const cartUpdate = async (req, res) => {
    try {
        let customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Set new to true to return updated document

        if (customer) { // **Check if customer exists**
            return res.status(200).json({ status: 'success', message: 'Cart updated successfully', data: customer.cartDetails }); // Use 200 status code for successful update
        } else {
            return res.status(404).json({ status: 'fail', message: 'No customer found', data: null }); // Use 404 status code for not found
        }
    } catch (err) {
        return res.status(500).json({ status: 'error', message: 'Internal server error', error: err.message }); // Did proper error handling with error message
    }
};

module.exports = {
    customerRegister,
    customerLogIn,
    getCartDetail,
    cartUpdate,
};
