const signed = require('signed');
const express = require('express');
const router = express.Router();
const config = require('config');
//const auth = require('../middleware/auth');

const signature = signed({
    secret: config.get('secretKey')
});


router.get('/', auth, async (req, res) => {
    try {
        const s = signature.sign('https://api.taspen.co.id/upload');
        return res.status(200).send(JSON.stringify({signedUrl:s}));

    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: 'Internal Server Error' });
    }
});

app.post('/upload', signature.verifier(), (req, res, next) => {
    // Do upload (using multipart)
});

app.get('/download', signature.verifier(), (req, res, next) => {
    // Do upload (using multipart)
});