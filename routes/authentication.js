const express = require('express');
const { getHash, createPassword } = require('../repositories/authRepository');
const userRepository=require('../repositories/userRepository')
const router = express.Router();
const { hash, verify } = require('../utils/hashutil')
const jwt=require('jsonwebtoken');
const config=require('config');

router.post('/createpassword', async (req, res) => {
    var userId = req.body.userId;
    var password = req.body.password;
    try {
        var generatedHash = await hash(password);

        await createPassword(userId, generatedHash);
        return res.status(200).json({ message: 'Password created' })
    } catch (error) {
        return res.status(501).json({ error: error });
    }

})

//verify password
router.post('/', async (req, res) => {
    var userId = req.body.userId;
    var password = req.body.password;
    //try {
        var hash = await getHash(userId);
        if (hash) {
            var result = await verify(password, hash);
            if (result === true) {
                var user = userRepository.getDataById(userId);
                var jwtPrivateKey=config.get('jwtPrivateKey');
                var token=jwt.sign(
                    {
                        userId:userId, 
                        userName:user.userName
                    },jwtPrivateKey, {expiresIn:'1d'} );

                return res.status(200).json({ token: token, message: 'Login Success. Token will be expired in 24 hrs'})
            }
            else {
                return res.status(401).json({ message: 'Wrong username or password' })

            }
        }
        else {
            return res.status(401).json({ message: 'Wrong username or password' })
        }


    //} catch (error) {
    //    return res.status(501).json({ error: error });
    //}

})

module.exports = router;