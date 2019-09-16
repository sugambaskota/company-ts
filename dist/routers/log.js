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
const auth = require('../middleware/auth');
const Log = require('../models/log');
const router = express_1.default.Router();
router.get('/log', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const log = yield Log.findAll({
            where: {
                userId: req.user.uuid
            },
            attributes: [["action", "Action"], ["time", "Time"]]
        });
        res.status(200).json(log);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
router.get('/report', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield Log.findAll({
            where: {
                userId: req.user.uuid,
                action: 'POST /users' || 'POST /users/login',
            },
            attributes: [["action", "Action"], ["time", "Time"]]
        });
        res.status(200).json(report);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
module.exports = router;
exports.default = router;
//# sourceMappingURL=log.js.map