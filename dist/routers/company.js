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
const Company = require('../models/company');
const User = require('../models/user');
const router = express_1.default.Router();
router.post('/companies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Company.create(req.body);
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.get('/companies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield Company.findAll({
            include: [
                {
                    model: User,
                    attributes: [["name", "Name"], ["email", "Email"], ["age", "Age"]]
                }
            ],
            attributes: [["uuid", "ID"], ["name", "Name"]]
        });
        res.status(200).json(companies);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
module.exports = router;
