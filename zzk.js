/**
 * [组件库]
 * 
 * @auhor: zkzhao
 * @date: 2017/9/26
 * @version: 1.1
 * @email: zzk_312@163.com
 */
;(function(global,factory) {
  if(typeof module === "object" && typeof module.exports === "object"){
    //CommonJS
    module.exports = factory(global,true);
  }else if(typeof define === 'function' && define.amd){
    //AMD
    define([],factory);
  }else{
    factory(global);
  }
}(typeof window!== "undefined" ? window : this, function(window){

'use strict';
var zzk= function(selector){
  return new zzk.prototype.init(selector);
}
//原型方法
zzk.fn= zzk.prototype={
  constructor: zzk,
  init: function(selector){
    if(!selector){
      return this;
    }
    var elem= document.querySelector(selector);
    if(elem){
      this[0]= elem;
      this.length= 1;
    }
    return this;
  },
  /**
   * [短信验证码倒计时]
   * @param  {[number]} timing [总倒计时时间]
   * @param  {[function]} callback   [倒计时结束后的回调函数]
   */
  smscd: function(){
    var timing=10, callback, myTimer, node= this[0], target=arguments[0];
    if(typeof target=== "number" || typeof target=== "string"){
      timing= parseInt(target);
      callback= arguments[1] || null;
    }
    if(typeof target=== "function"){
      callback= target;
    }
    myTimer= setInterval(function() {
      --timing;
      if(typeof node.textContent){
        node.textContent= "（"+timing+"s）";
      }else if(typeof node.innerText){
        node.innerText= "（"+timing+"s）";
      }
      if (timing === 0) {
        clearInterval(myTimer);
        if(callback){
          callback();
        }
      }
    }, 1000);
  },
  /**
   * [报名截止时间倒计时]
   * @param  {[Timestamp]} val [截止时间的时间戳]
   */
  timecd: function(val){
    var node= this[0], 
        myTimer, timing,
        gettime= function(){
          var endTime= (val.toString().length==10?val*1000:val) || new Date().getTime(), //结束时间戳
              timeDiff= endTime- new Date().getTime(),//时间差:秒
              daysLeft= timeDiff %(24*3600*1000), //计算天数后剩余的毫秒数
              hoursLeft= daysLeft %(3600*1000), //计算小时数后剩余的毫秒数
              minutesLeft= hoursLeft%(60*1000), //计算分钟数后剩余的毫秒数
              pms = {
                sec: "00",
                mini: "00",
                hour: "00",
                day: "00",
                timeDiff: timeDiff
              };
          if(timeDiff>0){
            pms.sec = Math.round(minutesLeft/1000)?zzk.zero(Math.round(minutesLeft/1000)):"00"; //秒数
            pms.mini = Math.floor(hoursLeft/(60*1000))?zzk.zero(Math.floor(hoursLeft/(60*1000))):"00" //分钟数
            pms.hour = Math.floor(daysLeft/(3600*1000))>0?zzk.zero(Math.floor(daysLeft/(3600*1000))):"00"; //小时数
            pms.day = Math.floor(timeDiff/ (24*60*60*1000))>0?Math.floor(timeDiff/ (24*60*60*1000)):"00"; //相差天数
          }
          return pms;
        };
    myTimer= setInterval(function(){
      timing= gettime();
      node.innerHTML= timing.day+'天 '+timing.hour+': '+timing.mini+': '+timing.sec;
      if(timing.timeDiff<0){
        gettime= null;
        clearInterval(myTimer);
      }
    },1000);
  }
}
//无new结构
zzk.fn.init.prototype= zzk.fn;

//继承
zzk.extend= zzk.fn.extend= function(){
  var options,src,copy,
      target= arguments[0] || {},
      i= 1,
      length= arguments.length;
  if(i===length){
    target= this;
    i--;
  }
  for(;i<length;i++){
    if((options= arguments[i])!= null){
      for(name in options){
        copy= options[name];
        target[name]= copy;
      }
    }
  }
  return target;
}
//静态方法
zzk.extend({
  /**
   * [URL获取参数值]
   * @return {[obj]} [args]
   */
  urlparam: function(){
    var args= {};
    var query= location.search.substring(1);
    var pairs= query.split("&");
    for(var i=0; i<pairs.length; i++){
      var pos= pairs[i].indexOf('=');
      if(pos == -1) continue;
      var name= pairs[i].substring(0,pos);
      var value= pairs[i].substring(pos+1);
      value= decodeURIComponent(value);
      args[name]= value;
    }
    return args;
  },
  //小于10的数字补齐前面的0
  zero: function(n){
    var n = parseInt(n, 10);
    if(n > 0){
      if(n <= 9){
        n = "0" + n;  
      }
      return String(n);
    }else{
      return "00";  
    }
  },
  /**
   * [阴影，锁屏]
   * showShadow：显示阴影
   * colseShadow： 隐藏阴影
   * @param  {[string]} opts.img [锁屏图片路径]
   * @param  {[string]} opts.size [图片大小]
   */
  showShadow: function(opts){
    var body= document.getElementsByTagName('body'),
        node= document.createElement('div'),
        style = document.createElement('style'),
        css = '.circle-load {position: absolute;width: 200px;height: 200px;top: 50%;left: 50%; transform: translate(-50%, -50%);}'+
              '.circle-load-svg {stroke-dasharray: 0 570;animation: rot 1.5s linear infinite;}'+
              '@keyframes rot {100% {stroke-dasharray: 570 570;}}';
    node.style.zIndex= "99";
    node.style.backgroundColor= "rgba(0,0,0,0.5)";
    node.style.width= "100%";
    node.style.height= "100%";
    node.style.position= "fixed";
    node.style.top= "0";
    node.style.left= "0";
    node.id="zzk.shadowBackdrop";
    style.type = 'text/css';
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
    node.innerHTML= '<div class="circle-load">'+
                      '<svg width="240" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
                            '<circle cx="110" cy="110" r="90" stroke-width="15" stroke="gainsboro" fill="none"></circle>'+
                            '<circle cx="110" cy="110" r="90" stroke-width="15" stroke="darkturquoise" fill="none" class="circle-load-svg"></circle>'+
                        '</svg>'+
                    '</div>';
    body[0].appendChild(node);
  },
  colseShadow:function(){
    var shadow=document.getElementById('zzk.shadowBackdrop');
    shadow.remove();
  }
});

window.zzk=zzk;
return zzk;
}));
