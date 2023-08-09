const con = require('../db/hanaclient');

async function getData(skip, take) {
    try {
        var sqlcount = 'SELECT COUNT(*) AS COUNT FROM DEVELOPER.USERS';
        cmd = con.prepare(sqlcount);
        var usersCount = cmd.exec();

        if (skip && take) {
            var sql = 'SELECT USERID, USERNAME FROM DEVELOPER.USERS LIMIT ? OFFSET ?';
            var cmd = con.prepare(sql);
            var usersdb = await cmd.exec([take, skip]);

            return { data: usersdb, count: usersCount[0].COUNT };
        }
        else {
            var sql = 'SELECT USERID, USERNAME FROM DEVELOPER.USERS';
            var cmd = con.prepare(sql);
            var usersdb = await cmd.exec();

            return { data: usersdb, count: usersCount[0].COUNT };
        }
    } catch (error) {
        console.error(error);
        throw(error);
    }
}

async function getDataById(userId) {
    var sql = 'SELECT USERID, USERNAME FROM DEVELOPER.USERS WHERE USERID=?';
    var cmd = con.prepare(sql);
    var usersdb = await cmd.exec([userId]);
    if (usersdb.length > 0)
        return usersdb[0];
    else
        return null;
}

async function addData(user) {
    var sql = 'INSERT INTO DEVELOPER.USERS (USERID, USERNAME) VALUES (?, ?)';
    var cmd = con.prepare(sql);
    await cmd.exec([user.userId, user.userName]);
    //users.push(user);
    return getDataById(user.userId);
}

async function updateData(user) {

    var sql = 'UPDATE DEVELOPER.USERS SET USERNAME = ? WHERE USERID = ?';
    var cmd = con.prepare(sql);
    await cmd.exec([user.userName, user.userId]);
    //users.push(user);
    return getDataById(user.userId);

}
module.exports = { getData, getDataById, addData, updateData }