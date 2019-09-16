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
const Task = require('../models/task');
const auth = require('../middleware/auth');
const Log = require('../models/log');
router.post('/tasks', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Task.create({
            description: req.body.description,
            completed: req.body.completed,
            userId: req.user.id
        });
        let timeNow = moment_1.default();
        yield Log.create({
            userId: req.user.uuid,
            action: 'POST /tasks',
            time: timeNow
        });
        res.status(201).send();
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.get('/tasks', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task.findAll({
            where: {
                userId: req.user.id
            },
            attributes: [["uuid", "ID"], ["description", "Description"], ["completed", "Completed"]]
        });
        let timeNow = moment_1.default();
        yield Log.create({
            userId: req.user.uuid,
            action: 'GET /tasks',
            time: timeNow
        });
        res.status(200).json(tasks);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
router.get('/tasks/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const task = yield Task.findOne({
            where: {
                uuid: _id
            },
            attributes: [["uuid", "ID"], ["description", "Description"], ["completed", "Completed"]]
        });
        if (!task) {
            return res.status(404).send();
        }
        let timeNow = moment_1.default();
        yield Log.create({
            userId: req.user.id,
            action: `GET /tasks/${_id}`,
            time: timeNow
        });
        res.status(200).json(task);
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
router.delete('/tasks/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const task = yield Task.findOne({
            where: {
                uuid: _id
            }
        });
        if (!task) {
            return res.status(404).send();
        }
        let timeNow = moment_1.default();
        yield Log.create({
            userId: req.user.id,
            action: `DELETE /tasks/${_id}`,
            time: timeNow
        });
        yield task.destroy();
        res.status(202).send();
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
router.patch('/tasks/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }
    try {
        const task = yield Task.findOne({
            where: {
                uuid: _id
            }
        });
        if (!task) {
            return res.sendStatus(404).send();
        }
        yield task.save(req.body);
        let timeNow = moment_1.default();
        yield Log.create({
            userId: req.user.id,
            action: `PATCH /tasks/id`,
            time: timeNow
        });
        res.status(202).send();
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
module.exports = router;
//# sourceMappingURL=task.js.map