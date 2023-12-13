const signed = require('signed').default;
const express = require('express');
const router = express.Router();
const config = require('config');
//const auth = require('../middleware/auth');

const signature = signed({
    secret: config.get('secretKey')
});


router.get('/uploadurl', async (req, res) => {
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


//https://api.taspen.co.id/documents?signed=r_5379514645-e_1696924069-bd04dbf6eaf5fd57e64a0f911e1440825a030792
router.post('/', signature.verifier(), (req, res, next) => {
    //{
    //   DocId: DOC001,
    //   Tag01: NOLKPP,
    //}
    // Do upload (using multipart) from client to media server

});

//https://api.taspen.co.id/documents/DOC001?signed=r_781559142-30a8f120ec710831729346f1862d89448d1889b1
router.get('/:id', signature.verifier(), (req, res, next) => {
    // hit
});

router.post('/approve', signature.verifier(), (req, res, next) => {


})
module.exports = router;