var banner = {
    insert : 'insert into banner(title,url,createDate) values(?,?,?)',
    delById : 'delete from banner where id = ?',
    update : 'update banner set title=?,url=? where id = ?',
    queryAll : 'select * from banner',
    queryById : 'select * from banner where id = ?'
}
module.exports = banner;