// 구축시 진행된 스크립트 나열함.
// 필요없는 부분은 모두 지우고 정리 할 것.
// if(location.search.indexOf('ll=true') != -1){
// 	document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':8888/livereload.js"></' + 'script>');
// 	// HTML 구축시만 필요 개발 진행시 이 부분은 삭제
// }

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// cookie plugin
!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(t){function o(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},o.defaults,i),"number"==typeof i.expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(s){}return r=t.write?t.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],u=/(%[0-9A-Z]{2})+/g,d=0;d<p.length;d++){var f=p[d].split("="),l=f.slice(1).join("=");'"'===l.charAt(0)&&(l=l.slice(1,-1));try{var m=f[0].replace(u,decodeURIComponent);if(l=t.read?t.read(l,m):t(l,m)||l.replace(u,decodeURIComponent),this.json)try{l=JSON.parse(l)}catch(s){}if(n===m){c=l;break}n||(c[m]=l)}catch(s){}}return c}}return o.set=o,o.get=function(e){return o.call(o,e)},o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(n,t){o(n,"",e(t,{expires:-1}))},o.withConverter=n,o}return n(function(){})});

//jQuery.noConflict();
!function($) {
    'use strict';

    $(function(){
        initUI.setup();

        // 퍼블리싱 전용 (주의!!! 개발 완료시 모두 삭제)/////////////////////////////
        if(location.port == '8888' || location.hostname.indexOf('uxdev.etribe.co.kr') != -1){
            header.init(); // 개발언어로 변경시 이 부분 삭제 해야 합니다. (개발언어로 인클루드 필요.)
            footer.init(); // 개발언어로 변경시 이 부분 삭제 해야 합니다. (개발언어로 인클루드 필요.)


            // mac os 일 경우 html 태그에 mac_os 클래스 붙임
            if (navigator.userAgent.indexOf('Mac OS X') != -1) {
                $("html").addClass("mac_os");
            }
        }
        /////////////////////////////////////////////////////////////////////////////
    });

    var isIE8 = $('html').hasClass('ie8');
    var isIE = (function detectIE() {
        var ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    })();
    isIE8 = isIE;
    var isIOS = (/iPad|iPhone|iPod/.test(navigator.userAgent || navigator.vendor || window.opera) && !window.MSStream);

    var initUI = (function(){
        var isLoaded;

        function setup(){
            if(isLoaded){
                return;
            }
            isLoaded = true;

            registUI('.sample_class', uiSampleFunction, false);
            registUI('.ui-location', uiLocationFunction, false); // location



            // 공통 적용
            textPlaceHolderInit(); // ie7,8 가능한 placeholder
            uiLocationFunction(); // location

        }

        function registUI(el, fn, saveData){
            if(saveData === undefined){
                saveData = true;
            }

            var _inst;

            $(el).each(function(idx, obj){
                _inst = new fn();
                _inst.init(obj, el);
                if(saveData){
                    $(el).data('_inst', _inst);
                }
            });
        }

        return {
            setup: setup
        };
    })();

    // placeholder
    window.textPlaceHolderInit = function(_selector){

        var havePlaceholder = false;
        var input = document.createElement('input');
        havePlaceholder = ('placeholder' in input);
        var selectEl;

        if(_selector && _selector.length > 0){
            selectEl = _selector.find('input[type=text], textarea, input[type=password], textarea');
        }else{
            selectEl = $('input[type=text], textarea, input[type=password], textarea');
        }

        if(!havePlaceholder){
            selectEl.each(function(idx, obj){
                var _this = $(this);
                var placeholderAttr = 'placeholder';

                var placeholderText = _this.attr(placeholderAttr);

                /*
                if(_this.val() == ''){
                    _this.val(placeholderText);
                }
                */
                if(_this.prev('.placeholder_guidetext').length <= 0){
                    _this.wrap('<span class="placeholder_wrap" style="display:inline-block;position:relative;"></span>');

                    if(_this.hasClass('input_b')){
                        _this.before('<span class="placeholder_guidetext bold"></span>');
                    }else{
                        _this.before('<span class="placeholder_guidetext"></span>');
                    }

                    var prevGuideText = _this.prev('.placeholder_guidetext');
                    prevGuideText.text(placeholderText);
                    prevGuideText.hide();
                    if(_this.val() == ''){
                        prevGuideText.show();
                    }

                    if(_this.css('text-align') == 'right'){
                        prevGuideText.css({left: 'auto', right: 13});
                    }

                    prevGuideText.addClass('placeholder_text');

                    _this.bind('mousedown focusin', function(e){
                        if(!$(this).attr('disabled') || !$(this).attr('readonly')){
                            prevGuideText.hide();
                        }
                    }).bind('focusout', function(e){
                        if($(this).val() == ''){
                            prevGuideText.show();
                        }
                    });

                    prevGuideText.bind('mousedown', function(e){
                        if(!$(this).next(input).attr('disabled') || !$(this).next(input).attr('readonly')){
                            $(this).hide();
                        }
                        setTimeout(function(){
                            _this.focus();
                        }, 100);
                    });
                }
            });
        }
    };

    // header include
    var header = (function(){
        var el;

        function init(){
            el = $('#header');

            if(el.length && el.children().length <= 0){
                window.header = $.get('/inc/layout/header.html');
                window.header.done(function(data){
                    el.html(data);

                    setTimeout(function(){
                        complete();
                    }, 0);
                });
            }else{
                complete();
            }
        }

        function complete(){
        }

        return {init: init};
    })();

    // footer include
    var footer = (function(){
        var el;

        function init(){
            el = $('#footer');

            if(el.length && el.children().length <= 0){
                window.footer = $.get('/inc/layout/footer.html');
                window.footer.done(function(data){
                    el.html(data);

                    setTimeout(function(){
                        complete();
                    }, 0);
                });
            }else{
                complete();
            }
        }

        function complete(){
            /*
            ex)

            familysite등의 footer에 속한 스크립트는 footer안에서 서술
            */

        }

        return {init: init};
    })();

    // lacation function
    var uiLocationFunction = function(){
        var el, depBtn, depLi, depLiUl;


        function init(_el){
            el = $(_el);
            depLi = el.find('> li');
            depLiUl = el.find('> li > ul');
            depBtn = el.find('> li > a');

            bindEvents();

            return this;
        }

        function bindEvents(){
            depBtn.on('click', function(){
                var checkOn = $(this).parent();
                var showList = $(this).next();
                if(checkOn.hasClass('on') == false){
                    resetLocation();
                    checkOn.addClass('on');
                    showList.slideDown();
                }else{
                    checkOn.removeClass('on');
                    showList.slideUp();
                }
            })
            el.on('focusout', function(){
                setTimeout(function(){
                    resetLocation();
                }, 300);
            })
        }

        function resetLocation(){
            depLi.removeClass('on');
            depLiUl.hide();
        }

        return {
            init: init
        };
    }









    // sample function
    var uiSampleFunction = function(){
        var el;

        function init(_el){
            el = $(_el);

            bindEvents();

            return this;
        }

        function bindEvents(){

        }

        return {
            init: init
        };
    }












































}(jQuery);

