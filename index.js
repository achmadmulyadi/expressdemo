const express = require('express');
const helmet = require('helmet');
const users = require('./routes/users');
const authentication=require('./routes/authentication')
const cors=require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet()); //@raising-stack
app.use('/api/v1/users', users)
app.use('/api/v1/roles', users)
app.use('/api/v1/authentication', authentication)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    //res.header("Access-Control-Allow-Headers", "x-auth-token,Content-Type");
    res.header('Content-Type', 'application/json');
    next();
  });

const port = 3000;
console.log(`Listening on port ${port}`);
const server=app.listen(port);
module.exports=server;
