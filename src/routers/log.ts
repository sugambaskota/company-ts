import express from 'express';
const auth = require('../middleware/auth');
const Log = require('../models/log');
const router = express.Router();

router.get('/log', auth, async (req: any, res: any) => {
    try {
        const log = await Log.findAll({
            where: {
                userId: req.user.uuid
            },
            attributes: [["action", "Action"], ["time", "Time"]]
        });
        res.status(200).json(log);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/report', auth, async (req: any, res: any) => {
    try {
        const report = await Log.findAll({
            where: {
                userId: req.user.uuid,
                action: 'POST /users' || 'POST /users/login',
            },
            attributes: [["action", "Action"], ["time", "Time"]]
        });
        res.status(200).json(report);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;

export default router;