const express = require('express');
const Company = require('../models/company');
const User = require('../models/user');
const router = express.Router();

router.post('/companies', async (req, res) => {
    try {
        await Company.create(req.body);
        res.status(201).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.findAll({
            include: [
                {
                    model: User,
                    attributes: [["name", "Name"], ["email", "Email"], ["age", "Age"]]
                }
            ],
            attributes: [["id", "ID"], ["name", "Name"]]
        });
        res.status(200).json(companies);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;