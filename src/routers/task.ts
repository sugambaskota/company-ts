import express from 'express';
import moment from 'moment';
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');
const Log = require('../models/log');

router.post('/tasks', auth, async (req: any, res: any) => {
    try {
        await Task.create({
            description: req.body.description,
            completed: req.body.completed,
            userId: req.user.id
        });
        let timeNow = moment();
        await Log.create({
            userId: req.user.uuid,
            action: 'POST /tasks',
            time: timeNow
        });
        res.status(201).send();
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/tasks', auth, async (req: any, res: any) => {
    try {
        const tasks = await Task.findAll({
            where: {
                userId: req.user.id
            },
            attributes: [["uuid", "ID"], ["description", "Description"], ["completed", "Completed"]]
        });
        let timeNow = moment();
        await Log.create({
            userId: req.user.uuid,
            action: 'GET /tasks',
            time: timeNow
        });
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.get('/tasks/:id', auth, async (req: any, res: any) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({
            where: {
                uuid: _id
            },
            attributes: [["uuid", "ID"], ["description", "Description"], ["completed", "Completed"]]
        });
        if (!task) {
            return res.status(404).send();
        }
        let timeNow = moment();
        await Log.create({
            userId: req.user.uuid,
            action: `GET /tasks/${_id}`,
            time: timeNow
        });
        res.status(200).json(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/tasks/:id', auth, async (req: any, res: any) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({
            where: {
                uuid: _id
            }
        });
        if (!task) {
            return res.status(404).send();
        }
        let timeNow = moment();
        await Log.create({
            userId: req.user.uuid,
            action: 'DELETE /tasks',
            time: timeNow
        });
        await task.destroy();
        res.status(202).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/tasks/:id', auth, async (req: any, res: any) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }
    try {
        const task = await Task.findOne({
            where: {
                uuid: _id
            }
        });
        if (!task) {
            return res.sendStatus(404).send();
        }
        await task.save(req.body);
        let timeNow = moment();
        await Log.create({
            userId: req.user.uuid,
            action: `PATCH /tasks/id`,
            time: timeNow
        });
        res.status(202).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;