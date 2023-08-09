const con = require('../db/hanaclient');

var users = [
    { userId: '001@taspen.co.id', userName: 'User 001' },
    { userId: '002@taspen.co.id', userName: 'User 002' },
    { userId: '003@taspen.co.id', userName: 'User 003' },
    { userId: '004@taspen.co.id', userName: 'User 004' },
    { userId: '005@taspen.co.id', userName: 'User 005' },
    { userId: '006@taspen.co.id', userName: 'User 006' },
    { userId: '007@taspen.co.id', userName: 'User 007' },
    { userId: '008@taspen.co.id', userName: 'User 008' },
    { userId: '009@taspen.co.id', userName: 'User 009' },
    { userId: '010@taspen.co.id', userName: 'User 010' },
    { userId: '011@taspen.co.id', userName: 'User 011' },
    { userId: '012@taspen.co.id', userName: 'User 012' },
    { userId: '013@taspen.co.id', userName: 'User 013' },
]

function getData(skip, take) {
    var sqlcount='SELECT COUNT(*) AS COUNT FROM DEVELOPER.USERS';
    cmd = con.prepare(sqlcount);
    var usersCount=cmd.exec();

    if (skip && take) {
        var sql='SELECT USERID, USERNAME FROM DEVELOPER.USERS LIMIT ? OFFSET ?';
        var cmd=con.prepare(sql);
        var usersdb = cmd.exec([take, skip]);

        return { data: usersdb, count: usersCount[0].COUNT };
    }
    else {
        var sql='SELECT USERID, USERNAME FROM DEVELOPER.USERS';
        var cmd=con.prepare(sql);
        var usersdb = cmd.exec();
        
        return { data: usersdb, count: usersCount[0].COUNT };
    }
}

function getDataById(userId){
    return users.find(p => p.userId === userId);
}

function addData(user){
    users.push(user);
    return getDataById(user.userId);
}

function updateData(user){
    var userData=users.find(p=>p.userId===user.userId)
    if(userData)
        userData.userName=user.userName;
    return userData;

}
module.exports = {getData, getDataById, addData, updateData }