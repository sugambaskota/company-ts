const express = require('express');
const auth = require('../middleware/auth');
const Log = require('../models/log');
const router = express.Router();

// router.get('/log/:id', auth, async (req, res) => {
//     try {
//         const log = await Log.findAll({
//             where: {
//                 id: req.params.id,
//                 userId: req.user.id
//             }
//         });
//         res.status(200).json(log);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// });

router.get('/report', auth, async (req, res) => {
    try {
        const log = await Log.findAll({
            where: {
                userId: req.user.id,
                action: 'POST /users' || 'POST /users/login',
            },
            attributes: [["action", "Action"], ["time", "Time"]]
        });
        res.status(200).json(log);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;