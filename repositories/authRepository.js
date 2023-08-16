const con = require('../db/hanaclient');

async function getHash(userId) {
    var sql = 'SELECT USERID, HASH FROM DEVELOPER.USERS WHERE USERID=?';
    var cmd = con.prepare(sql);
    var usersdb = await cmd.exec([userId]);
    if (usersdb.length > 0)
        return usersdb[0].HASH;
    else
        return null;
}

async function createPassword(userId, hash) {
    var sql = 'UPDATE DEVELOPER.USERS SET HASH=? WHERE USERID=?';
    var cmd = con.prepare(sql);
    var result = await cmd.exec([hash, userId]);
    return result;
}
module.exports = { getHash, createPassword }