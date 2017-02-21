import moment from 'moment'
export default {
  timeFormat (value,formatString) {
      if(value != null && value != ''){
        formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
        return moment(value).format(formatString);
      }
  }
}
