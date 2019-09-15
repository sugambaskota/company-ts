import express from 'express';
import moment from 'moment';
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const Log = require('../models/log');

router.post('/users', async (req: any, res: any) => {
    try {
        let user: any = await User.create(req.body);
        let token: any = await user.generateAuthToken();
        let timeNow: any = moment();
        await Log.create({
            userId: user.uuid,
            action: 'POST /users',
            time: timeNow
        });
        res.status(201).json({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req: any, res: any) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password, req.body.companyId);
        const token = await user.generateAuthToken();
        const timeNow = moment();
        await Log.create({
            userId: user.uuid,
            action: 'POST /users/login',
            time: timeNow
        });
        res.json({ user, token });
    } catch (e) {
        res.status(406).send();
    }
});

router.get('/users/profile', auth, async (req: any, res: any) => {
    try {
        const user = req.user;
        const timeNow = moment();
        await Log.create({
            userId: user.uuid,
            action: 'GET /users/profile',
            time: timeNow
        });
        res.status(200).json(user);
    } catch (e) {
        res.status(408).send();
    }
});

router.delete('/users/remove', auth, async (req: any, res: any) => {
    try {
        const user = req.user;
        await user.destroy();
        const timeNow = moment();
        await Log.create({
            userId: user.uuid,
            action: 'DELETE /users/remove',
            time: timeNow
        });
        res.status(202).send();
    } catch (e) {
        res.status(408).send();
    }
});

router.patch('/users/update', auth, async (req: any, res: any) => {
    const user = req.user;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const result = await user.update(req.body);
        const timeNow = moment();
        await Log.create({
            userId: user.uuid,
            action: 'PATCH /users/update',
            time: timeNow
        });
        res.status(202).json(result);
    } catch (e) {
        res.status(408).send();
    }
});

module.exports = router;