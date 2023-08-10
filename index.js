const express = require('express');
const helmet = require('helmet');
const users = require('./routes/users');
const authentication=require('./routes/authentication')

const app = express();
app.use(express.json());
app.use(helmet()); //@raising-stack
app.use('/api/v1/users', users)
app.use('/api/v1/authentication', authentication)


const port = 3000;
app.listen(port);
console.log(`Listening on port ${port}`);