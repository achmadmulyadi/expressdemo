const hana = require('@sap/hana-client');
const host='172.16.50.202';
const port='38141';
const user='TRAINING';
const password='Tr@ining1234';

const connOptions = {
    serverNode: host + ":" + port,
    uid: user,
    pwd: password
};
const con = hana.createConnection();
con.connect(connOptions);
module.exports = con;