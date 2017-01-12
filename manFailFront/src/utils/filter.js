import Vue from 'vue'
import moment from 'moment'
Vue.filter('time',(value,formatString) => {
    if(value != null && value != ''){
        formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
        return moment(value).format(formatString);
    }

})

//设置后台域名
Vue.filter('proxyWebsite',(v) => {
  const host = window.location.host.split(':')[0];
  const website = 'http://'+host+':3000/';
  return website + v;
})
