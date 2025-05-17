const bcrypt = require('bcrypt');
const UserModel = require('../Models/User');
const jwt = require('jsonwebtoken')



const signup = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        const user = await UserModel.findOne({ email })

        if(user) {
            return res.json({success: true, message: 'User is already exist, Please login.'});
        }

        const newUser = new UserModel({name, email, password});

        newUser.password = await bcrypt.hash(password, 10);

        await newUser.save();

        const jwtToken = jwt.sign(
            {email: newUser.email, _id: newUser._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({success: true, message: 'SignUp successfull', jwtToken});

    } catch (error) {
        res.json({success: false, message: 'Error in SignUp', error});
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await UserModel.findOne({email});

        if(!user)return res.json({success: false, message: 'Email not registered, SignUp please'});

        const isPassword = await bcrypt.compare(password, user.password);

        if(!isPassword)return res.json({success: false, message: 'Invalid Credentials'});

        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({
            success: true,
            message: 'Login successfull',
            jwtToken
        })

    } catch (error) {
        res.json({success: false, message: 'Error in Login.'})
    }
}

module.exports = {
    signup, login
};