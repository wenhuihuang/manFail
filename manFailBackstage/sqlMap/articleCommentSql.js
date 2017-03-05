var articleComment = {
    insert : 'insert into articleComment(articleId,userId,commentText,createDate) values(?,?,?,?)',
    delById : 'delete from articleComment where id = ?',
    update : 'update articleComment set articleId=?,userId=?,commentText=?,createDate=? where id = ?',
    queryAll : 'select * from articleComment',
    queryById : 'select * from articleComment where id = ?',
    queryByArticleId : 'SELECT articleComment.id,articleComment.articleId,articleComment.userId,articleComment.commentText,articleComment.createDate,user.nickname,user.userName,user.headImg FROM articleComment,user WHERE articleComment.userId = user.userId && articleComment.articleId = ? '
}
module.exports = articleComment;