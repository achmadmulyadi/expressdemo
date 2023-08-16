const con = require('../db/hanaclient');
const parseFilter=require('../utils/parseFilter');
const parseSorting=require('../utils/parseSorting');

async function getData(skip, take, filter, sort) {
    try {
        var sqlcount = 'SELECT COUNT(*) AS COUNT FROM DEVELOPER.ROLES';
        cmd = con.prepare(sqlcount);
        var rolesCount = cmd.exec();
        var extFilter='';
        if (filter) {
            extFilter = JSON.parse(filter);
            var strExtFilter = "WHERE (" + parseFilter(extFilter) + ")";

        }

        var sortExp=parseSorting(sort);

        if (skip && take) {
            var sql = `SELECT ROLEID, ROLENAME FROM DEVELOPER.ROLES ${strExtFilter} ${sortExp} LIMIT ? OFFSET ?`;
            var cmd = con.prepare(sql);
            var rolesdb = await cmd.exec([take, skip]);

            return { data: rolesdb, count: rolesCount[0].COUNT };
        }
        else {
            var sql = `SELECT ROLEID, ROLENAME FROM DEVELOPER.ROLES ${strExtFilter} ${sortExp}`;
            var cmd = con.prepare(sql);
            var rolesdb = await cmd.exec();

            return { data: rolesdb, count: rolesCount[0].COUNT };
        }
    } catch (error) {
        console.error(error);
        throw(error);
    }
}

async function getDataById(roleId) {
    var sql = 'SELECT ROLEID, ROLENAME FROM DEVELOPER.ROLES WHERE ROLEID=?';
    var cmd = con.prepare(sql);
    var rolesdb = await cmd.exec([roleId]);
    if (rolesdb.length > 0)
        return rolesdb[0];
    else
        return null;
}

async function addData(role) {
    var sql = 'INSERT INTO DEVELOPER.ROLES (ROLEID, ROLENAME) VALUES (?, ?)';
    var cmd = con.prepare(sql);
    await cmd.exec([role.roleId, role.roleName]);
    //roles.push(role);
    return getDataById(role.roleId);
}

async function updateData(role) {

    var sql = 'UPDATE DEVELOPER.ROLES SET ROLENAME = ? WHERE ROLEID = ?';
    var cmd = con.prepare(sql);
    await cmd.exec([role.roleName, role.roleId]);
    //roles.push(role);
    return getDataById(role.roleId);

}
module.exports = { getData, getDataById, addData, updateData }