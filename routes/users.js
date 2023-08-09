const express = require('express');
const userRepository=require('../repositories/userRepository')
const router = express.Router();
var users = [
    { userId: '001@taspen.co.id', userName: 'User 001' },
    { userId: '002@taspen.co.id', userName: 'User 002' },
    { userId: '003@taspen.co.id', userName: 'User 003' },
    { userId: '004@taspen.co.id', userName: 'User 004' },
    { userId: '005@taspen.co.id', userName: 'User 005' },
    { userId: '006@taspen.co.id', userName: 'User 006' },
    { userId: '007@taspen.co.id', userName: 'User 007' },
    { userId: '008@taspen.co.id', userName: 'User 008' },
    { userId: '009@taspen.co.id', userName: 'User 009' },
    { userId: '010@taspen.co.id', userName: 'User 010' },
    { userId: '011@taspen.co.id', userName: 'User 011' },
    { userId: '012@taspen.co.id', userName: 'User 012' },
    { userId: '013@taspen.co.id', userName: 'User 013' },
]

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
        return res.status(400).send(`Data with id ${userData.userId}`)
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