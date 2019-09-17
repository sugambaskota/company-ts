"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const router = express_1.default.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const Log = require('../models/log');
const Company = require('../models/company');
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let corCompany = yield Company.findOne({
            where: {
                uuid: req.body.companyId
            }
        });
        let user = yield User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            companyId: corCompany.id,
            age: req.body.age
        });
        let token = yield user.generateAuthToken();
        let timeNow = moment_1.default();
        yield Log.create({
            userId: user.uuid,
            action: 'POST /users',
            time: timeNow
        });
        res.status(201).json({ "User": {
                "ID": user.uuid,
                "Name": user.name,
                "Email": user.email,
                "Age": user.age
            }, "Token": token });
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByCredentials(req.body.email, req.body.password, req.body.companyId);
        const token = yield user.generateAuthToken();
        const timeNow = moment_1.default();
        yield Log.create({
            userId: user.uuid,
            action: 'POST /users/login',
            time: timeNow
        });
        res.json({ "User": {
                "ID": user.uuid,
                "Name": user.name,
                "Email": user.email,
                "Age": user.age
            }, "Token": token });
    }
    catch (e) {
        res.status(406).send();
    }
}));
router.get('/users/profile', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const timeNow = moment_1.default();
        yield Log.create({
            userId: user.uuid,
            action: 'GET /users/profile',
            time: timeNow
        });
        res.status(200).json({
            "ID": user.uuid,
            "Name": user.name,
            "Email": user.email,
            "Age": user.age
        });
    }
    catch (e) {
        res.status(408).send();
    }
}));
router.delete('/users/remove', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        yield user.destroy();
        const timeNow = moment_1.default();
        yield Log.create({
            userId: user.uuid,
            action: 'DELETE /users/remove',
            time: timeNow
        });
        res.status(202).send();
    }
    catch (e) {
        res.status(408).send();
    }
}));
router.patch('/users/update', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const result = yield user.update(req.body);
        const timeNow = moment_1.default();
        yield Log.create({
            userId: user.uuid,
            action: 'PATCH /users/update',
            time: timeNow
        });
        res.status(202).json({
            "ID": result.uuid,
            "Name": result.name,
            "Email": result.email,
            "Age": result.age
        });
    }
    catch (e) {
        res.status(408).send();
    }
}));
module.exports = router;
//# sourceMappingURL=user.js.map