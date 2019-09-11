const express = require('express');
const Log = require('../models/log');
const router = express.Router();

router.get('/user/:id/report', async (req, res) => {
    try {
        const log = await Log.findAll({
            where: {
                userId: req.params.id
            }
        });
        res.status(200).json(log);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;