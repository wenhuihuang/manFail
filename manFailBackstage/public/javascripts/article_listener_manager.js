/**
 * Created by hui on 2016-11-30.
 */
Namespace.register('hwh');
hwh.ListenerMgr = (function(){
    //获取当前tr 的id
    var _fn_getInfo = function () {
        var e = util.getEvent();
        var target = e.target || e.srcElement;
        var tr = $(target).parents('tr');
        var id = $(tr).attr('id');
       return {
           target : target,
           id : id
       };
    }

    var _fn_del = function () {
        var id = _fn_getInfo().id;
        $.ajax({
            type : 'POST',
            url : '/newBack/article/del',
            data : {id:id},
            success : function (data) {
                if(data.code == '200'){
                    window.hwh.Confirm("成功！","success");
                    $('#'+id).remove();
                }
            },
            error : function (data) {
                window.hwh.Confirm("网络出错："+data+"","error");
            }
        })
    }

    var _postFile = function (data) {
        //1.创建异步对象
        var req = new XMLHttpRequest();

        //2.设置参数
        req.open("post", "/newBack/article/addSubmit", true);

        //3.设置 请求 报文体 的 编码格式（设置为 表单默认编码格式）
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        req.setRequestHeader("X_FILENAME", encodeURIComponent(data.name));
        // req.setRequestHeader("")
        //4.设置回调函数
        req.onreadystatechange = function () {
            //请求状态readyState=4准备就绪,服务器返回的状态码status=200接收成功
            if (req.readyState == 4 && req.status == 200) {

                if (req.responseText != "上传出错！") {
                    changeName(req.responseText);
                }
            }
        };

        //4.发送异步请求
        req.send("articleTitle="+data);//post传参在此处
    }
    
    var _fn_ajaxSubmit = function () {
        var file = $("[name='articleTitle']").val()
        console.log(file)

        _postFile(file)
    }



    /*----------------------------------------------------*/
    /**
     * 在这里通过DOM节点的className来对应节点需要增加的事件监听
     * @type {{click: {}, mouseover: {}, mouseout: {}}}
     * @private
     */
    var _classNameListenerMap = {
        click : {
            'js_del' : _fn_del,
            'js_ajaxSubmit':_fn_ajaxSubmit
        },
        mouseover : {

        },
        mouseout : {

        }
    }

    /**
     *启动事件监听管理器
     * @private
     */
    var _run = function () {
        window.addEventMap(
            $('.modal-page-main'),  //需要进行事件监听的容器
            ['click','mouseover','mouseout'],                     //event 列表
            _classNameListenerMap   //class映射表
        );
    }

    return {
        run : _run
    }
})()

$(function(){
    hwh.ListenerMgr.run();

})