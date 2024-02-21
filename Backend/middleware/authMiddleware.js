import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Ticket from '../models/ticketModel.js';

// Protect routes
const protect = async (req, res, next) => {
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({
                message: 'Not authorized, token failed'
            })
        }
    } else {
        return res.status(401).json({
            message: 'Not authorized, no token'
        })
    }
}

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401).json({
            message: 'Not authorized as admin'
        })
    }
};

// Get User
const checkUser = async (req,res,next) => {
    const user_id = req.user.id
    const id = req.params.id

    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message: 'User Not Found'
            })
        }
        if(id === user_id){
            next();
        } else {
            return res.status(404).json({
                message: "User ID Not Found"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid User ID'
        })
    }
}

const checkAuth = async (req, res, next) => {
    const user_id = req.user.id
    const ticket = req.params.id

    try{
        const user = await Ticket.findById(ticket);
        if(!user){
            return res.status(404).json({
                message: "Ticket Not Found"
            })
        }
        if(user.user_id != user_id){
            return res.status(404).json({
                message: "User Ticket Not Found"
            })
        } else{
            next();
        }
    } catch (error){
        return res.status(404).json({
            message: "Invalid Ticket ID"
        })
    }
}

const userExists = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({
            message: "User Already Exists"
        })
    }
    next();
}

export { protect, admin, checkUser, checkAuth, userExists };