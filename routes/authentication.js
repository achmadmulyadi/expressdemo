const express = require('express');
const { getHash, createPassword } = require('../repositories/authRepository');
const router = express.Router();
const { hash, verify } = require('../utils/hashutil')

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
    try {
        var hash = await getHash(userId);
        if (hash) {
            var result = await verify(password, hash);
            if (result === true) {
                return res.status(200).json({ message: 'Login Success' })
            }
            else {
                return res.status(401).json({ message: 'Wrong username or password' })

            }
        }
        else {
            return res.status(401).json({ message: 'Wrong username or password' })
        }


    } catch (error) {
        return res.status(501).json({ error: error });
    }

})

module.exports = router;