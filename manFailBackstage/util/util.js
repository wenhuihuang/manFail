var util = {
    /**
     * 向客户端返回json数据
     * @param response
     * @param result
     */
    responseJONS : function (response,result) {
        if(typeof result === 'undefined'){
            response.json({
                code : '-200',
                msg : '操作失败！'
            })
        }else{
            response.json(result);
        }
    },
    formatDate : function (dateObj) {
        var date = new Date(dateObj);
        var d = date.toLocaleDateString();
        var t = date.toLocaleTimeString();
        return d + " " + t;
    }
}
module.exports = util;