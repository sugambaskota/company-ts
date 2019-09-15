import jwt from 'jsonwebtoken';
const User = require('../models/user');

const auth = async (req: any, res: any, next: any) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded: any = jwt.verify(token, 'helloworld');
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