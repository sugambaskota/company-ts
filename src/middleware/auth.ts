//import jwt from 'jsonwebtoken';
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const auth = async (req: any, res: any, next: any) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            where: {
                uuid: decoded._id
            }
        });
        if(!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({error: "Please authenticate!"})
    }
}

module.exports = auth;