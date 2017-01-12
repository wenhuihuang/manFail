var article = {
    insert : 'insert into article(articleTitle,createTime,updateTime,articleDesc,articleAuthor,articleContent,minIcon) values(?,?,?,?,?,?,?)',
    delById : 'delete from article where id = ?',
    update : 'update article set articleTitle=?,updateTime=?,articleDesc=?,articleAuthor=?,articleContent=?,minIcon=? where id = ?',
    queryAll : 'select * from article',
    queryById : 'select * from article where id = ?'
}
module.exports = article;