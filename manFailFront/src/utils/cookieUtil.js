/**
 * Created by hui on 2017-01-12.
 */
export default {
  /**
   * 设置cookie
   * @param {Object} name
   * @param {Object} value
   */
  setCookie (name,value,t,path){
    if(t != null){
      var exp = new Date();
      exp.setTime(t)
    }else{
      var Days = 30; //设置过期的天数
      var exp = new Date();
      exp.setTime(exp.getTime() + Days*24*60*60*1000); //这个是毫秒
    }
    if(path == null || path == undefined){
      path = '/'
    }
    document.cookie = name + "="+ encodeURIComponent (value) + ";expires=" + exp.toGMTString()+";path="+path;
  },
  /**
   * 获取cookie
   * @param {Object} name
   */
  getCookie (name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  /**
   * 删除cookie
   * @param {Object} name
   */
  delCookie (name,path){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=this.getCookie(name);
    if(path == null || path == undefined){
      path = '/'
    }
    if(cval!=null)
      document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path="+path;
  }
}
