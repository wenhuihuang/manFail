var user = {
    insert : 'insert into user(userName,role,gender,phone,password) values(?,?,?,?,?)',
    delById : 'delete from user where userId = ?',
    update : 'update user set userName=?,role=?,gender=?,phone=?,password=? where userId = ?',
    queryAll : 'select * from user',
    queryByUserName : 'select * from user where userName = ?',
    queryById : 'select * from user where userId = ?'

}
module.exports = user;