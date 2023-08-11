const express = require('express');
const userRepository = require('../repositories/userRepository');
const Joi = require('joi');
const router = express.Router();

const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        console.log(req.query)
        var result = await userRepository.getData(req.query.skip, req.query.take, req.query.filter, req.query.sort);
        return res.status(200).send(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: 'Internal Server Error' });
    }
});

router.get('/:userId', auth, async (req, res) => {
    var userId = req.params.userId;

    var user = await userRepository.getDataById(userId);
    if (user) {
        return res.status(200).send(JSON.stringify(user));
    }
    else {
        return res.status(404).send(JSON.stringify({ userId: userId, error: `User with id ${userId} not found` }));
    }
})

router.post('/', auth, async (req, res) => {

    const userSchema = Joi.object({
        userId: Joi.string().email().required(),
        userName: Joi.string().required()

    })
    var userData = req.body;
    try {
        var validationResult = await userSchema.validateAsync(userData);
        if (validationResult.error) {
            return res.status(400).send(JSON.stringify({ error: validationResult.error }));
        }
    }
    catch (error) {
        return res.status(400).send(JSON.stringify({ error: error }));
    }
    if (await userRepository.getDataById(userData.userId))
        return res.status(400).send(`Data with id ${userData.userId} already exist`)
    var user = await userRepository.addData(userData);
    return res.status(200).send(JSON.stringify(user));



})

router.put('/', auth, async (req, res) => {
    try {
        var userId = req.body.userId;
        var userData = req.body;
        var user = await userRepository.getDataById(userId);
    
        //console.log(`Request by ${req.user.userId} on endpoint /users method PUT`);
        if (user) {
            user = await userRepository.updateData(userData);
            return res.status(200).send(JSON.stringify(user));
        }
        else {
            
            return res.status(404).send(JSON.stringify({ userId: userId, error: `User with id ${userId} not found` }));
        }
    
    } catch (error) {
        return res.status(404).send(JSON.stringify({ userId: userId, error: `User with id ${userId} not found` }));
    }
 
})

module.exports = router;