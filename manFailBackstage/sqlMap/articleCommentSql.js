var articleComment = {
    insert : 'insert into articleComment(articleId,userId,commentText,createDate) values(?,?,?,?)',
    delById : 'delete from articleComment where id = ?',
    update : 'update articleComment set articleId=?,userId=?,commentText=?,createDate=? where id = ?',
    queryAll : 'select * from articleComment',
    queryById : 'select * from articleComment where id = ?',
    queryByArticleId : 'select * from articleComment where articleId = ?'
}
module.exports = articleComment;