const hana = require('@sap/hana-client');
const config = require('config');

var host = config.get("dbConfig.host");
var port = config.get("dbConfig.port");
var user = config.get("dbConfig.user");
var password=config.get("dbConfig.password");
//console.log(process.env);
//console.log(host);
const connOptions = {
    serverNode: host + ":" + port,
    uid: user,
    pwd: password
};
const con = hana.createConnection();
con.connect(connOptions);
module.exports = con;