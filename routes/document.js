const signed = require('signed').default;
const express = require('express');
const router = express.Router();
const config = require('config');
//const auth = require('../middleware/auth');

const signature = signed({
    secret: config.get('secretKey')
});


router.get('/uploadurl',  async (req, res) => {
    try {
        var newDocId = 'DOC001'; //--> sample only
        //1. Generate newDocID
        //2. map and store newDocID and path/docId in media server
        const uploadUrl = signature.sign(`https://api.taspen.co.id/documents`,{ttl:3600});
        const downloadUrl = signature.sign(`https://api.taspen.co.id/documents/${newDocId}`);
        return res.status(200).send(JSON.stringify({documentId:newDocId,uploadUrl:uploadUrl, downloadUrl:downloadUrl}));

    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: 'Internal Server Error' });
    }
});

router.post('/', signature.verifier(), (req, res, next) => {
    // Do upload (using multipart) from client to media server
});

router.get('/:id', signature.verifier(), (req, res, next) => {
    // hit
});

module.exports = router;