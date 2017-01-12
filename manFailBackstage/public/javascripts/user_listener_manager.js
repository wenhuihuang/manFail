/**
 * Created by hui on 2016-11-30.
 */
Namespace.register('hwh');
hwh.ListenerMgr = (function(){


    //转换成编辑状态
    var _fn_renderInput = function (id) {
        var tds = $("#"+id).find('td')
        for(var i = 1; i < tds.length-1;i++){
            var text = $(tds[i]).html();
            var name = $(tds[i]).data('name');

            if(name == 'gender'){
                var na = text == '男' ? 'checked' : '';
                var nv = text == '女' ? 'checked' : '';
                var radio = '<input type="radio" class="edit-v" data-name="'+name+'" name="'+name+id+'" '+na+' value="0">男&nbsp;&nbsp;<input type="radio" data-name="'+name+'" name="'+name+id+'" '+nv+' value="1">女';
                $(tds[i]).html(radio);
            }
            else if(name == 'role'){
                var a = text == '普通会员' ? 'selected' : '';
                var b = text == 'VIP会员' ? 'selected' : '';
                var c = text == '管理员' ? 'selected' : '';
                var select = '<select class="edit-v"  data-name="'+name+'"><option value="0" '+a+'>普通会员</option><option value="1" '+b+'>VIP会员</option><option value="2" '+c+'>管理员</option></select>';
                $(tds[i]).html(select);


            }
            else{
                var input = '<input class="edit-v"  type="text" value="'+text+'" data-name="'+name+'" style="width:auto">';
                $(tds[i]).html(input);
            }

        }
    }
    //转换成显示状态
    var _fn_renderView = function (id,obj) {
        var tds = $('#'+id).children('td');
       for(var key in obj){
           $('#'+id).children('[data-name="'+key+'"]').html(obj[key]);
       }
    }

    var _fn_add = function () {

    }
    var _fn_del = function () {
        var id =$(this).parents('tr').attr('id');
        $.ajax({
            type : 'POST',
            url : '/newBack/user/del',
            data : {userId:id},
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
    var _fn_update = function () {
        var id = $(this).parents('tr').attr('id');
        if($(this).hasClass('js_update')){
            _fn_renderInput(id)
            $(this).removeClass('js_update').addClass('js_save').text('保存');
        }
    }
    var _fn_save = function () {
        var self = this;
        var id = $(this).parents('tr').attr('id');
        var inputs = $('#'+id).find('.edit-v');
        var obj = {};
        var objText = {};//显示用
            obj["userId"] = id;
            objText['userId'] = id;
        for(var i = 0; i < inputs.length;i++){
            var key = $(inputs[i]).data('name');
            if(key == 'gender'){
                var value = $('[name="gender'+id+'"]:checked').val();
                obj[key] = value;
                objText[key] = value == 0 ? '男' : '女';
            }else if(key == 'role'){
                var value = $(inputs[i]).val();
                var arr = ['普通会员','VIP会员','管理员'];
                obj[key] = value;
                objText[key] =arr[value];
            }else{
                var value = $(inputs[i]).val();
                obj[key] = value;
                objText[key] = value
            }


        }
        $.ajax({
            type : 'POST',
            url : '/newBack/user/update',
            data : obj,
            success:function (data) {
                console.log(data);
                if(data.code == '200'){
                    window.hwh.Confirm("成功","success");
                    _fn_renderView(id,objText)
                    $(self).removeClass('js_save').addClass('js_update').text('编辑');
                }
            },
            error:function (data) {
                window.hwh.Confirm("网络出错："+data+"","error");
            }
        })
        console.log(obj)
    }

    /*----------------------------------------------------*/
    /**
     * 在这里通过DOM节点的className来对应节点需要增加的事件监听
     * @type {{click: {}, mouseover: {}, mouseout: {}}}
     * @private
     */
    var _classNameListenerMap = {
        click : {
            'js_add' : _fn_add,
            'js_del' : _fn_del,
            'js_update' : _fn_update,
            'js_save' : _fn_save

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