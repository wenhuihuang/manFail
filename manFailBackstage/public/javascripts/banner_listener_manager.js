/**
 * Created by hui on 2016-11-30.
 */
Namespace.register('hwh');
hwh.ListenerMgr = (function(){

    var _fn_del = function () {
        var e = window.event || arguments.callee.caller.arguments[0];
        var target = e.target || e.srcElement;
        var id = $(target).parents('tr').attr('id');
        alert(id)
        $.ajax({
            type : 'POST',
            url : '/newBack/banner/del',
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



    /*----------------------------------------------------*/
    /**
     * 在这里通过DOM节点的className来对应节点需要增加的事件监听
     * @type {{click: {}, mouseover: {}, mouseout: {}}}
     * @private
     */
    var _classNameListenerMap = {
        click : {
            'js_del' : _fn_del,
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