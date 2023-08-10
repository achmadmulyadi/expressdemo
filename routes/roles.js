const express = require('express');
const roleRepository = require('../repositories/roleRepository');
const Joi = require('joi');
const router = express.Router();

const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        var result = await roleRepository.getData(req.query.skip, req.query.take, req.query.filter, req.query.sort);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: 'Internal Server Error' });
    }
});

router.get('/:roleId', auth, async (req, res) => {
    var roleId = req.params.roleId;

    var role = await roleRepository.getDataById(roleId);
    if (role) {
        return res.status(200).send(JSON.stringify(role));
    }
    else {
        return res.status(404).send(JSON.stringify({ roleId: roleId, error: `Role with id ${roleId} not found` }));
    }
})

router.post('/', auth, async (req, res) => {

    const roleSchema = Joi.object({
        roleId: Joi.string().email().required(),
        roleName: Joi.string().required()

    })
    var roleData = req.body;
    try {
        var validationResult = await roleSchema.validateAsync(roleData);
        if (validationResult.error) {
            return res.status(400).send(JSON.stringify({ error: validationResult.error }));
        }
    }
    catch (error) {
        return res.status(400).send(JSON.stringify({ error: error }));
    }
    if (await roleRepository.getDataById(roleData.roleId))
        return res.status(400).send(`Data with id ${roleData.roleId} already exist`)
    var role = await roleRepository.addData(roleData);
    return res.status(200).send(JSON.stringify(role));



})

router.put('/', auth, async (req, res) => {
    var roleId = req.body.roleId;
    var roleData = req.body;
    var role = await roleRepository.getDataById(roleId);

    if (role) {
        role = await roleRepository.updateData(roleData);
        return res.status(200).send(JSON.stringify(role));
    }
    else {
        return res.status(404).send(JSON.stringify({ roleId: roleId, error: `Role with id ${roleId} not found` }));
    }
})

module.exports = router;