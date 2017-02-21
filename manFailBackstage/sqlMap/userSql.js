var user = {
    insert : 'insert into user(userName,role,gender,phone,password) values(?,?,?,?,?)',
    delById : 'delete from user where userId = ?',
    update : 'update user set userName=?,role=?,gender=?,phone=?,password=? where userId = ?',
    queryAll : 'select * from user',
    queryByUserName : 'select * from user where userName = ?',
    queryById : 'select * from user where userId = ?',
    updateHeadImg : 'update user set headImg = ? where userId = ?',
    updateNickname : 'update user set nickname = ? where userId =? ',
    updateBirthday : 'update user set birthday = ? where userId = ?',
    updatePhone : 'update user set phone = ? where userId = ?'

}
module.exports = user;