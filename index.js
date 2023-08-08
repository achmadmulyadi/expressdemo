const express = require('express');
const helmet = require('helmet');
const users = require('./routes/users');


const app = express();
app.use(express.json());
app.use(helmet());
app.use('/api/v1/users', users)



const port = 3000;
app.listen(port);
console.log(`Listening on port ${port}`);