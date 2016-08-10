/**
 * [组件库]
 * 
 * @auhor: zkzhao
 * @date: 2016/8/10
 * @version: 1.0
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
   * @return {[type]}     [description]
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
zzk.fn.init.prototype= zzk.fn;

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
   * showShodw：显示阴影
   * colseShodw： 隐藏阴影
   */
  createMask: function(){
    $("body").append('<div class="g-tkzz tc" style="z-index:9999;display:none;background: url(http://7xj5ea.com2.z0.glb.qiniucdn.com/loa_phone-zzbg.png) repeat; width: 100%; height: 100%; position: fixed; top: 0; left: 0;"><img style="margin-top: 15%;" src="http://7xj5ea.com2.z0.glb.qiniucdn.com/loa_loading.gif" alt=""></div>');
    $(".g-tkzz").fadeIn('slow/400/fast');
  },
  colseShodw:function(){
    $(".g-tkzz").fadeOut('slow/400/fast',function(){
      $(".g-tkzz").remove();
    });
  }
});

window.zzk=zzk;
return zzk;
}));
