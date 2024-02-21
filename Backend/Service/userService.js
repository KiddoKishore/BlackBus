import User from '../models/userModel.js';

const authenticateUser = async (email, password) => {
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))){
        return user
    }
}

const createUser = async (name, email, password, isAdmin) => {
    const user = await User.create({
        name,email,password, isAdmin
    });
    return user
}

const getUser = async (id) => {
    const user = await User.findById(id)
    if (user){
        return user
    }
}

export {authenticateUser, createUser, getUser}