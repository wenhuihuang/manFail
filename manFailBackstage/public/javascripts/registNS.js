/**
 * Created by hui on 2016-11-30.
 */
//声明一个全局对象Namespace，用来注册命名空间
Namespace = new Object();
//全局对象仅仅存在register函数，参数为名称空间全路径
Namespace.register = function (fullNS) {
    //将命名空间切成n部分，
    var nsArray = fullNS.split('.');
    var sEval = "";
    var sNS = "";
    for(var i = 0; i < nsArray.length;i++){
        if(i != 0){
            sNS += ".";
        }
        sNS += nsArray[i];
        // 依次创建构造命名空间对象（假如不存在的话）的语句
        // 比如先创建Grandsoft，然后创建Grandsoft.GEA，依次下去
        sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();"
    }
    if (sEval != "") eval(sEval);
}
