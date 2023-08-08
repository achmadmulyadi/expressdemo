
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

function getAllData(skip, take) {
    if (skip && take) {

        return { data: users.slice(parseInt(skip) - 1, parseInt(skip) - 1 + parseInt(take)), count: users.length };
    }
    else {
        return { data: users, count: users.length };
    }
}

module.exports = {getAllData }