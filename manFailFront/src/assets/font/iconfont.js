;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-shouyefill" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M982.028557 404.405174 573.32303 83.942886c-34.918864-27.694272-89.619352-27.694272-124.538216 0L43.175542 404.577188c-13.933143 11.008903-16.169326 31.134554-5.332437 44.895683s31.134554 16.169326 44.895683 5.332437l13.073072-10.320847 0 387.547791c0 54.872501 56.936671 95.983874 107.852847 95.983874l639.892491 0c50.22812 0 84.1149-38.531161 84.1149-95.983874L927.672098 443.452377l14.449185 11.352931c5.84848 4.644381 12.729044 6.880564 19.781623 6.880564 9.460776 0 18.921552-4.128339 25.286074-12.213002C998.369898 435.539728 995.789686 415.414077 982.028557 404.405174zM607.897867 797.113388l0 66.741475-63.989249 0-63.989249 0-63.989249 0 0-66.741475 0-112.325214c0-37.155048 30.102469-77.234336 95.983874-77.234336 66.053418 0 95.983874 40.079288 95.983874 77.234336L607.897867 797.113388 607.897867 797.113388z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-shouye" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M979.792374 404.577188 574.183101 83.942886c-34.918864-27.694272-89.619352-27.694272-124.538216 0L44.207626 404.577188c-13.933143 11.008903-16.169326 31.134554-5.332437 44.895683s30.618512 16.169326 44.551655 5.332437l12.55703-10.320847 0 387.547791c0 54.872501 57.968755 95.983874 108.712918 95.983874l639.892491 0c50.22812 0 83.254829-38.531161 83.254829-95.983874L927.844112 445.860575l11.69696 8.944734c5.84848 4.644381 13.073072 6.880564 20.125651 6.880564 9.460776 0 18.921552-4.128339 25.286074-12.213002C995.9617 435.711742 993.725517 415.586091 979.792374 404.577188zM479.919368 864.026877 479.919368 686.508315c0-8.77272 15.997312-13.245087 31.994625-13.245087s31.994625 4.472367 31.994625 13.245087l0 177.346548L479.919368 864.026877 479.919368 864.026877zM864.026877 832.032253c0 21.157736-5.84848 31.994625-19.26558 31.994625L608.585923 864.026877c0-0.516042-0.688056-0.860071-0.688056-1.376113L607.897867 686.508315c0-37.155048-29.930455-77.234336-95.983874-77.234336s-95.983874 40.079288-95.983874 77.234336l0 176.142449c0 0.516042 0.860071 0.860071 0.860071 1.376113L204.868806 864.026877c-20.125651 0-44.723669-17.373425-44.723669-31.994625L160.145137 393.740299 488.864102 134.171006c11.868974-9.288762 33.198723-9.288762 44.895683 0l330.095078 261.11742L863.854863 832.032253z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-xiangzuo1" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-caidan" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M133.310936 296.552327l757.206115 0c19.781623 0 35.950949-16.169326 35.950949-35.950949 0-19.781623-15.997312-35.950949-35.950949-35.950949L133.310936 224.650428c-19.781623 0-35.950949 16.169326-35.950949 35.950949C97.359987 280.383 113.529313 296.552327 133.310936 296.552327z"  ></path>'+
      ''+
      '<path d="M890.51705 476.135058 133.310936 476.135058c-19.781623 0-35.950949 16.169326-35.950949 35.950949 0 19.781623 16.169326 35.950949 35.950949 35.950949l757.206115 0c19.781623 0 35.950949-16.169326 35.950949-35.950949C926.467999 492.304384 910.298673 476.135058 890.51705 476.135058z"  ></path>'+
      ''+
      '<path d="M890.51705 727.447673 133.310936 727.447673c-19.781623 0-35.950949 15.997312-35.950949 35.950949s16.169326 35.950949 35.950949 35.950949l757.206115 0c19.781623 0 35.950949-15.997312 35.950949-35.950949S910.298673 727.447673 890.51705 727.447673z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
