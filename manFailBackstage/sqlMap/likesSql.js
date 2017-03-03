var likes = {
    insert : 'insert into likes(commentId,articleId,isLike,createDate,userId) values(?,?,?,?,?)',
    delById : 'delete from likes where id = ?',
    update : 'update likes set commentId=?,articleId=?,isLike=?,createDate=?,userId=? where id = ?',
    queryAll : 'select * from likes',
    queryByCommentId : 'select * from likes where commentId = ?',
    queryByArticleId: 'select * from likes where articleId = ?',
    count : 'select count(*) from likes where commentId = ?'
}
module.exports = likes;