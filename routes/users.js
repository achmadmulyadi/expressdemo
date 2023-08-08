const express = require('express');
const users_dal=require('../dal/users_dal')
const router = express.Router();


router.get('/', (req, res) => {
        var result =users_dal.getAllData(req.query.skip, req.query.take);
        return res.status(200).send(JSON.stringify(result)); 
});

router.get('/:userId', (req, res) => {
    var userId = req.params.userId;
    var user = users.find(p => p.userId === userId);
    if (user) {
        return res.status(200).send(JSON.stringify(user));
    }
    else {
        return res.status(404).send(JSON.stringify({ userId: userId, error: `User with id ${userId} not found` }));
    }
})

router.post('/', (req, res)=> {
    //TODO: validasi input
    users.push(req.body);
    return res.status(200).send(JSON.stringify(req.body));

})

router.put('/',(req, res)=>{
    var userId = req.body.userId;
    var idx = users.findIndex(p => p.userId === userId);
    if (idx>=0) {
        users[idx].userName=req.body.userName
        return res.status(200).send(JSON.stringify(users[idx]));
    }
    else {
        return res.status(404).send(JSON.stringify({ userId: userId, error: `User with id ${userId} not found` }));
    } 
})

module.exports = router;