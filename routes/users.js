const express = require('express');
const userRepository=require('../repositories/userRepository')
const router = express.Router();


router.get('/', (req, res) => {
        var result =userRepository.getData(req.query.skip, req.query.take);
        return res.status(200).send(JSON.stringify(result)); 
});

router.get('/:userId', (req, res) => {
    var userId = req.params.userId;

    var user=userRepository.getDataById(userId);
    if (user) {
        return res.status(200).send(JSON.stringify(user));
    }
    else {
        return res.status(404).send(JSON.stringify({ userId: userId, error: `User with id ${userId} not found` }));
    }
})

router.post('/', (req, res)=> {
    //TODO: validasi input
    
    //users.push(req.body);
    var userData=req.body;
    if(userRepository.getDataById(userData.userId))
        return res.status(400).send(`Data with id ${userData.userId} already exist`)
    var user=userRepository.addData(userData);
    return res.status(200).send(JSON.stringify(user));

})

router.put('/',(req, res)=>{
    var userId = req.body.userId;
    var userData=req.body;
    var user = userRepository.getDataById(userId); //users.find(p => p.userId === userId);
    if (user) {
        userRepository.updateData(userData);
        return res.status(200).send(JSON.stringify(user));
    }
    else {
        return res.status(404).send(JSON.stringify({ userId: userId, error: `User with id ${userId} not found` }));
    } 
})

module.exports = router;