import jwt from 'jsonwebtoken';
import { Request } from 'express-serve-static-core';
import { NextFunction } from 'connect';
const User = require('../models/user');

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'helloworld');
        const user = await User.findOne({
            where: {
                id: decoded._id
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