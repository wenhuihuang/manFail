/**
 * Created by hui on 2016-11-29.
 */
/**
 *通过css class 的方式来注册事件
 * @param {HTMLElement} elmContainer 需要进行全局监听的HTML节点
 * @param {Array} arrEvent 需要监听的事件列表
 * @param {Object} classMap css-classt和event-function之间的映射
 * @param {Function} fuCustom 每次事件触发后需要执行的自定义操作
 */
window.addEventMap = function (elmContainer,arrEvent,classMap,fnCustom) {
    $.each(arrEvent,function(i,item){ //i 当前索引 item对应该事件数组中的每一种事件
        //只对一个节点进行各种事件监听
        $(elmContainer).bind(item,function (evt) {
            //获取当前触发源
            var evtTarget = evt.target || evt.srcElement;

            //对触发源DOM进行安全性判断
            if(!evtTarget) return false;

            for(var className in classMap[item]){
                //获取事件驱动方法
                var fnListener = classMap[item][className];
                //当前节点满足触发条件，则触发事件
                if(evtTarget.className && $(evtTarget).hasClass(className)){
                    fnListener.call(evtTarget,evt);
                    break;
                }
                //如果父节点满足，也可以触发事件
                else if(ancestor = $(evtTarget).parents('.'+className)[0]){
                    fnListener.call(ancestor,evt);
                    break;
                }
            }

            //支持自定义操作
            if(typeof fnCustom === "function"){
                fnCustom.call(evt);
            }

        })
    })
}
