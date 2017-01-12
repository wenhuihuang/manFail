import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import messages from 'assets/js/zh_CN'; //assets/js/zh_CN 代表你存放语言包的目录，从node_modules/vee-validate/dist/locale目录下面拷贝到你的项目
Validator.updateDictionary({
  zh_CN: {
    messages
  }
});
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
};
Vue.use(VeeValidate,config);
