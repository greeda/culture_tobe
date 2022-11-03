//jQuery.noConflict();
// 개발 전달 함수 & 퍼블 공통 사용 변수 지정
var devFn = {
    $lastFocusing: "",
    isDevice: "", // 디바이스 체크 "web" or "mobile"
};

! function ($) {
    // 퍼블 공통 사용 변수 지정
    var $body = $('body'), // 공통 body
        $html = $('html'), // 공통 html
        $dimm = $('.dimm', $body), // 공통 dimm
        _beforeDevice, // 디바이스 체크용도
        _beforeDirection, // 마우스 휠 체크 용도
        uaString = window.navigator.userAgent,
        _isIE = uaString.indexOf('Trident') >= 0, // IE체크
        _isChrome = uaString.indexOf('Chrome') != -1, // Chrome 체크
        _isIOS = (function iOS() {
            return [
                    'iPad Simulator',
                    'iPhone Simulator',
                    'iPod Simulator',
                    'iPad',
                    'iPhone',
                    'iPod'
                ].indexOf(navigator.platform) != -1
                // iPad on iOS 13 detection

        })(), // IPhone 체크
        _isMac = uaString.indexOf("Mac OS X") != -1 ; // Mac 체크

    function deviceCheck() {

        var _windowW = $(window).outerWidth();

        if (_windowW > 1023) {
            devFn.isDevice = "web"; // 1023 이상일때
        } else {
            devFn.isDevice = "mobile" // 1023 미만일때
        }
    }

    $(function () {

        gsap.registerPlugin(ScrollTrigger); // greensocks scrollTrigger Plugin 사용

        deviceCheck(); // 디바이스 체크 함수 실행

        initUI.setup(); //

        // dimm 항상 사라지게
        gsap.set($dimm, {
            alpha: 0,
            overwrite: true,
        });

        if (_isIOS) {
            $html.addClass("mac_os");
        }

        // resize bounded
        ScrollTrigger.addEventListener("refreshInit", function () {

            deviceCheck(); // 리사이즈후 디바이스 체크

            if (devFn.isDevice !== _beforeDevice && typeof _beforeDevice !== "undefined") {

                devFn.resizeinit._deviceChange(); // 디바이스가 바뀌었때만

                if (devFn.isDevice == "mobile") {
                    devFn.resizeinit._mobileChange(); // 디바이스가 바뀌었는데 모바일일때만
                } else if (devFn.isDevice == "web") {
                    devFn.resizeinit._webChange(); // 디바이스가 바뀌었는데 PC일때만
                }
            }

            devFn.resizeinit._alwaysChange(); // 리사이즈후 항상

            _beforeDevice = devFn.isDevice; // 리사이즈후 디바이스 바뀌었는지 체크

        });

        ScrollTrigger.create({
            trigger: $body,
            start: "top top",
            end: "bottom bottom",
            // markers: true,
            onUpdate: function (a) {
                var _direction = a.direction;

                if (_direction !== _beforeDirection) { // 마우스 휠 방향 바뀌었을때
                    if (_direction > 0) {
                        devFn.ui.wheeldown(); // uiCommon 공통 스크립트에 마우스(페이지) 내릴때 함수 실행들 추가
                    } else if (_direction < 0) {
                        devFn.ui.wheelup(); // uiCommon 공통 스크립트에 마우스(페이지) 올릴때 함수 실행들 추가
                    }
                }
                _beforeDirection = _direction
            }
        })

    });

    var initUI = (function () {
        var isLoaded;

        function setup() {

            if (isLoaded) {
                return;
            }

            isLoaded = true;

            // Common
            registUI('ui', uiCommon);

            // 아코디언 메뉴
            registUI('accordion', accordionController);

            // 팝업
            registUI('popup', uiModulePopup);

            // 툴팁
            registUI('tooltip', uiTooltip);

            // 드랍다운 박스
            registUI('dropdown', uiDropDownBox);

            // tab
            registUI('tab', uiTab);

            // resizeinit
            registUI('resizeinit', uiResizeinit);

            // uiInputControl
            registUI('input', uiInputControl);

            // 모든 스크롤 트리거 이벤트 스크롤 관련 함수는 꼭 제일 하단에 !
            registUI('scrollTrigger', uiScrollTrigger);

        }

        function registUI(_string, fn) {

            // fn.init()
            var _inst = fn();

            if ((_inst.group.length || _inst.group == "pass") && _inst.init !== undefined) {
                _inst.init();
            }
            // console.log(_inst)

            devFn[_string] = _inst

        }

        return {
            setup: setup
        };
    })();

    // uiCommon
    var uiCommon = function () {
        // 공통
        var $toggle = $('.ui-toggle'),
            $topBtn = $('.ui-sticky-top');

        function init() {

            bindEvent();

            if (devFn.isDevice == "web" && $('.ui-scrollbar').length) {
                uiScrollbar();
            }

            if ($('#footer').length) {
                bottomSticky(); // 제품 구매하기 푸터전에 멈추기
            }

            return this;

        }

        function bindEvent() {
            // ui-toggle 공통 사용
            $toggle.on("click", function (e) {
                e.preventDefault();
                var $this = $(this);
                toggle($this);
            });

            // ie 일때 다운로드 버튼 바인딩
            if (_isIE) {
                $('.ui-download').each(function () {
                    MS_bindDownload($(this));
                });
            }
        }

        // 공통 스크롤탑 써야하는 이유 : 동일한 duration , header있을때 header높이 제외하고 top , tab있을때 header + tab 높이제외하고 top으로 보내줌
        function scrollTop($el, _duration) {
            var _oft = typeof $el == "object" ? $el.offset().top : $el, // 요소로 파라미터 받았을때 : 숫자로 파라미터 받았을때
                _duration = typeof _duration !== "undefined" ? _duration : 1; // duration 시간있을때 : 1초

            var _scroll = $('.header-content').length > 0 ? _oft - $('.header-content').outerHeight() : _oft, // header - ( 헤더 빼고 )
                _scroll = $('.ui-sticky-item').length > 0 ? _scroll - $('.ui-sticky-item').outerHeight() : _scroll; // .sticky - (헤더 빼고 스틱키 아이템 빼고)

            gsap.to($html, _duration, {
                scrollTop: _scroll - 10,
                ease: "Power2.easeInOut",
                overwrite: true,
            });
        }

        // 파라미터 요소 토글 컨트롤
        function toggle($el) {
            if ($el.hasClass('toggle')) {
                $el.removeClass('toggle');
            } else {
                $el.addClass('toggle');
            }
        }

        // 마우스 휠 올릴때
        function wheelup() {

            $topBtn.removeClass('visible');
            gsap.to($topBtn, .25, {
                overwrite: true,
                onComplete: function () {
                    $topBtn.hide();
                }
            });
        }

        // 마우스 휠 내릴때
        function wheeldown() {
            gsap.to($topBtn, .1, {
                display: "inline-block",
                overwrite: true,
                onComplete: function () {
                    $topBtn.addClass('visible');
                }
            })
        }

        // 탑버튼 푸터전에 멈춰랏 !
        function bottomSticky() {
            ScrollTrigger.create({
                trigger: $('#footer'),
                start: "top bottom",
                end: "bottom bottom",
                // markers:true,
                onEnter: function () {
                    $topBtn.addClass('none-fixed');
                },
                onLeaveBack: function () {
                    $topBtn.removeClass('none-fixed');
                }
            })
        }

        // 공통 ui-scrollbar init();
        function uiScrollbar(string) {
            if (string == "undefined" || string == undefined) {
                $('.ui-scrollbar').each(function () {
                    $(this).scrollbar();
                });
            } else {
                $('.ui-scrollbar').each(function () {
                    $(this).scrollbar("destroy");
                });
            }
        }

        // ie 다운로드
        function MS_bindDownload(el) {
            if (el === undefined) {
                throw Error('I need element parameter.');
            }
            if (el.attr("href") === '') {
                throw Error('The element has no href value.');
            }
            var filename = el.attr('download');
            if (filename === null) {
                throw Error('I need download property.');
            }
            if (filename === '') {
                var tmp = el.attr('href').split('/');
                filename = tmp[tmp.length - 1];
            }
            el.on('click', function (evt) {
                evt.preventDefault();
                var xhr = new XMLHttpRequest();
                xhr.onloadstart = function () {
                    xhr.responseType = 'blob';
                };
                xhr.onload = function () {
                    navigator.msSaveOrOpenBlob(xhr.response, filename);
                };
                xhr.open("GET", el.attr("href"), true);
                xhr.send();
            })
        }


        return {
            init: init,
            scrollTop: scrollTop,
            toggle: toggle,
            wheelup: wheelup,
            wheeldown: wheeldown,
            uiScrollbar: uiScrollbar,
            group: "pass",
        }
    }





    // 아코디언 메뉴
    var accordionController = function () {
        var el,
            $allItem = $(".accordion-item");
            $allCont = $(".accordion-content", $allItem);

        function init() {
            el = $('.accordion-container');
            accordionBtn = el.find('.accordion-btn');

            bindEvents();

            return this;
        }

        function bindEvents() {
            $('.accordion-container').on('click', ".accordion-btn", function (e) {
                e.preventDefault();
                var $this = $(this);
                if (!$this.closest(".accordion-item").hasClass('active')) {
                    open($this.closest(".accordion-item"));
                } else {
                    close($this.closest(".accordion-item"));
                }
            });
            $('.accordion-container').on('click', ".accordion-all-btn", function (e) {
                e.preventDefault();
                var $this = $(this);

                var _group =  $this.data('toggle-group');


                if (!$this.hasClass('opened')) {
                    open($(".accordion-list[data-toggle-group="+_group+"]"));
                    $this.addClass('opened');
                } else {
                    close($(".accordion-list[data-toggle-group="+_group+"]"));
                    $this.removeClass('opened');
                }
            });
        }

        function open($el) {
            var $elItem = $el,
                $openCont = $(".accordion-content", $elItem), // accordion-item 밑에 열릴 컨텐츠
                $optionTg = $elItem.closest(".accordion-list"), // accordion-item 부모 그룹
                $group = $optionTg.data("group"), // accordion-item 부모 그룹 data-group
                _isOpenMotion = typeof $optionTg.data("motion-type") !== "undefined" ? $optionTg.data("motion-type") : "undefined",
                _isBodyScroll = typeof $optionTg.data("body-scroll") !== "undefined" ? $optionTg.data("body-scroll") : true,
                $groupAllItem = $('.accordion-list[data-group=' + $group + ']').find('.accordion-item') ;

            close($groupAllItem); // group 속성있으면 group끼리닫기 없으면 전부다 !

            $groupAllItem.removeClass("active");
            $elItem.addClass("active");

            switch (_isOpenMotion) {
                case "static":

                    $openCont.show();
                    if (_isBodyScroll) {
                        devFn.ui.scrollTop($el.closest('.accordion-item'));
                    }
                    ScrollTrigger.refresh(); // 열릴때 body 길이 길어져서 다시 scrollTrigger 위치 잡기

                    break;
                default:
                    $openCont.stop().slideDown(250, function () {
                        if (_isBodyScroll) {
                            devFn.ui.scrollTop($el.closest('.accordion-item'), .5);
                        }
                        ScrollTrigger.refresh(); // 열릴때 body 길이 길어져서 다시 scrollTrigger 위치 잡기
                    });
                    break;
            }

        }

        function close($el) {
            $el.each(function () {
                var _isCloseMotion = $(this).closest('.accordion-list').data("motion-type");
                $(this).closest('.accordion-item').removeClass('active');

                $closeTg = $(".accordion-content", $(this));

                switch (_isCloseMotion) {
                    case "static":
                        $closeTg.hide();
                        ScrollTrigger.refresh();
                        break;
                    default:
                        $closeTg.stop().slideUp(250, function () {
                            $closeTg.css('height', "")
                            ScrollTrigger.refresh();
                        });
                        break;
                }
            })
        }

        return {
            init: init,
            close: close,
            group: $('.accordion-container')
        }
    }





    // uiModulePopup
    var uiModulePopup = function () {
        var $btn = $('.ui-popup-open'),
            $closeBtnAll = $('.ui-popup-close-all'),
            $popupWrp = $('.ui-popup'),
            saveScroll,
            setClear; // 팝업 자동닫힘 변수지정

        var _optDefault = { // 팝업 기본 옵션
            duration: .5,
            dimm: true,
            _easing: "Power2.easeInOut",
            type: "btot"
        }

        function init() {
            bindEvent();
            return this;
        }

        function bindEvent() {
            // 팝업 열기 바인딩
            $btn.on("click", function (e) {
                e.preventDefault();
                var $this = $(this),
                    $tg = $this.data('popup-target');

                devFn.$lastFocusing = $this;

                open($tg);

                // 열고자하는 팝업에 iframe,vedio url 변경할때;
                if (typeof $this.data('url') !== "undefined") {
                    $($tg).find('iframe,video').attr('src', $this.data('url'));
                }

            });

            // 팝업 닫기 바인딩
            $body.on("click", ".ui-popup-close", function (e) {
                e.preventDefault();
                var $this = $(this);
                close($this.closest('.ui-popup'));
            })

            // 팝업 닫기버튼 포커스 아웃되면 팝업안에서 루프
            $body.on("focusout", ".ui-popup-close", function () {
                var $this = $(this);

                if ($this.closest('.ui-popup').find('[tabindex]').eq(0).length) {
                    $this.closest('.ui-popup').find('[tabindex]').eq(0).focus();
                }
            });

            // 팝업 전체닫기 바인딩
            $closeBtnAll.on("click", function (e) {
                e.preventDefault();
                closeAll();
            });

            // 딤클릭하면 팝업 다 닫힘
            $dimm.on("click", function (e) {
                e.preventDefault();
                closeAll();
            });

            set();

        }

        // 팝업 방향셋
        // 팝업 방향셋
        function set() {
            $('.ui-popup').each(function () {
                var $this = $(this);

                if ($this.hasClass('ui-main-popup') && $this.is(':visible')) {
                    dimm(true, .5);
                    return;
                }
                var _isType = typeof $this.data('popup-type') !== "undefined" ? $this.data('popup-type') : $this.data('popup-type', "btot/fade");
                var _getType = $this.data('popup-type').split("/");
                var _type

                if (devFn.isDevice == "mobile") {
                    _type = _getType[0];
                } else {
                    _type = _getType[1];
                }
                var _motionSet;

                switch (_type) {
                    case "static":
                        _motionSet = {
                            "transform": "translate(0)",
                            "display": "none",
                            overwrite: true,
                        }
                        break;
                    case "fade":
                        _motionSet = {
                            "opacity": "0",
                            "transform": "translate(0)",
                            "display": "none",
                            overwrite: true,
                        }
                        break;
                    case "btot":
                        _motionSet = {
                            "opacity": "1",
                            "transform": "translate(0, 100%)",
                            "display": "none",
                            overwrite: true,
                        }
                        break;
                    case "ttob":
                        _motionSet = {
                            "opacity": "1",
                            "transform": "translate(0, -100%)",
                            "display": "none",
                            overwrite: true,
                        }
                        break;
                    case "ltor":
                        _motionSet = {
                            "opacity": "1",
                            "transform": "translate(-100%, 0px)",
                            "display": "none",
                            overwrite: true,
                        }
                        break;
                    case "rtol":
                        _motionSet = {
                            "opacity": "1",
                            "transform": "translate(100%, 0px)",
                            "display": "none",
                            overwrite: true,
                        }
                        break;
                        // case "scale":
                        //     _motionSet = {
                        //         "opacity": "0",
                        //         "transform": "translate(0) scale(.9)",
                        //         "display": "none",
                        //         overwrite: true,
                        //     }
                        //     break;

                }

                gsap.set($this, _motionSet)
            });
        }

        // 팝업 재바인딩
        // 팝업 재바인딩 (보통 리사이즈할때 디바이스 바뀌면)
        function reInit() {

            $('.ui-popup-open ,.ui-popup-close , .ui-popup-close-all').off("click focusout");

            bindEvent();

            set();
        }

        // 팝업 열기
        // 팝업 열기 ( 설명은 component_popup_script.html )
        function open($el, _callback) {
            var $el = $($el),
                $foucsTg = $el.find('[tabindex],a,button').eq(0);

            var _isDimm = $el.data('popup-dimm') == "true" || typeof $el.data('popup-dimm') == "undefined" ? true : false,
                _isDuration = $el.data('popup-duration') ? parseInt($el.data('popup-duration')) : _optDefault.duration,
                _isType = $el.data('popup-type') ? $el.data('popup-type') : "scale/fade",
                _isAutoClose = $el.data('auto-close') ? $el.data('auto-close') : false,
                _isCallback = $el.data('callback') ? $el.data('callback') : false,
                _isBeforeCallback = $el.data('before-callback') ? $el.data('before-callback') : false,
                _isBodyScroll = $el.data('body-scroll') ? $el.data('body-scroll') : "";
            var _getType = _isType.split("/");
            var _type;

            // 버튼에 url 속성있으면 video,iframe,embed url 변경
            if ($el.find("video").length || $el.find("iframe").length || $el.find("embed").length) {
                $el.find("video,iframe,embed").each(function () {
                    var _videoSrc = $(this).data("src");
                    $(this).attr("src", _videoSrc);
                })
            }

            if (typeof _isCallback !== "function") {
                _isCallback = new Function('return ' + _isCallback);
            }
            if (typeof _isBeforeCallback !== "function") {
                _isBeforeCallback = new Function('return ' + _isBeforeCallback);
            }

            if (!_isBodyScroll) {
                onscrolled();
            }

            if (_isAutoClose) {
                if (setClear) {
                    clearInterval(setClear);
                }
                setClear = setTimeout(function () {
                    close($el);
                }, 2500)
            }

            if (devFn.isDevice == "mobile") {
                _type = _getType[0]
            } else {
                _type = _getType[1]
            }

            if (_isDimm == false) {
                dimm(false);
            } else {
                dimm(true);
            }

            // 팝업 display:block;
            $el.show();
            if (typeof _isBeforeCallback == "function") {
                _isBeforeCallback();
            }
            // 팝업 tabindex="-1" focus;
            if ($foucsTg.length) {
                $foucsTg.focus();
            }

            // 팝업 에니메이션
            switch (_type) {
                case "static":
                    gsap.set($el, {
                        alpha: 1,
                        overwrite: true,
                        onComplete: function () {
                            PopupPublic();
                        }
                    });
                    break;
                case "fade":
                    gsap.to($el, _isDuration, {
                        alpha: 1,
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            PopupPublic();
                        }
                    });
                    break;
                case "btot":
                    gsap.to($el, _isDuration, {
                        "transform": "translate(0, 0)",
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            PopupPublic();
                        }
                    });
                    break;
                case "ttob":
                    gsap.to($el, _isDuration, {
                        "transform": "translate(0, 0)",
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            PopupPublic();
                        }
                    });
                    break;
                case "ltor":
                    gsap.to($el, _isDuration, {
                        "transform": "translate(0, 0)",
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            PopupPublic();
                        }
                    });
                    break;
                case "rtol":
                    gsap.to($el, _isDuration, {
                        "transform": "translate(0, 0)",
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            PopupPublic();
                        }
                    });
                    break;
                case "scale":
                    gsap.fromTo($el, _isDuration, {
                        "transform": "scale(0.8)",
                        "opacity": 0,
                        ease: Back.easeInOut.config(3),
                        overwrite: true,
                    }, {
                        "transform": "scale(1)",
                        "opacity": 1,
                        ease: Back.easeInOut.config(3),
                        overwrite: true,

                        onComplete: function () {
                            PopupPublic();
                        }
                    });
                    break;
            }

            function PopupPublic() {
                $el.off("click").on("click", function (e) {
                    if (!$(e.target).closest('.ui-container').length) {
                        close($el);
                    }
                });
                if (typeof _callback == "function") {
                    _callback();
                }
                if (typeof _isCallback == "function") {
                    _isCallback();
                }
            }

        }

        // 팝업 닫기
        // 팝업 닫기
        function close($el, _callback) {

            var $el = $($el);

            offscrolled();

            var _isDuration = $el.data('popup-duration') ? parseInt($el.data('popup-duration')) : _optDefault.duration,
                _isType = $el.data('popup-type') ? _optDefault.type = $el.data('popup-type') : _optDefault.type;
            var _getType = _isType.split("/");
            var _type
            if (devFn.isDevice == "mobile") {
                _type = _getType[0]
            } else {
                _type = _getType[1]
            }

            if ($el.find("video").length || $el.find("iframe").length || $el.find("embed").length) {
                $el.find("video,iframe,embed").attr("src", "");
            }

            if (setClear) {
                clearInterval(setClear);
            }
            dimm(false);
            switch (_type) {
                case "static":
                    gsap.set($el, {
                        alpha: 0,
                        overwrite: true,
                        onComplete: function () {
                            $el.hide();
                            if (typeof _callback == "function") {
                                _callback()
                            }
                        }
                    });
                    break;
                case "fade":
                    gsap.to($el, _isDuration, {
                        alpha: 0,
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            $el.hide();
                            if (typeof _callback == "function") {
                                _callback()
                            }
                        }
                    });
                    break;
                case "btot":
                    gsap.to($el, _isDuration, {
                        y: "100%",
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            $el.hide();
                            if (typeof _callback == "function") {
                                _callback()
                            }
                        }
                    });
                    break;
                case "ttob":
                    gsap.to($el, _isDuration, {
                        y: "-100%",
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            $el.hide();
                            if (typeof _callback == "function") {
                                _callback()
                            }
                        }
                    });
                    break;
                case "ltor":
                    gsap.to($el, _isDuration, {
                        x: "-100%",
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            $el.hide();
                            if (typeof _callback == "function") {
                                _callback()
                            }
                        }
                    });
                    break;
                case "rtol":
                    gsap.to($el, _isDuration, {
                        x: "100%",
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            $el.hide();
                            if (typeof _callback == "function") {
                                _callback()
                            }
                        }
                    });
                    break;
                case "scale":
                    gsap.to($el, _isDuration, {
                        "transform": "scale(.9)",
                        "opacity": 0,
                        ease: Back.easeInOut.config(3),
                        overwrite: true,
                        onComplete: function () {
                            $el.hide();
                            if (typeof _callback == "function") {
                                _callback()
                            }
                        }
                    });
                    break;
                default:
                    gsap.to($el, _isDuration, {
                        y: "100%",
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            $el.hide();
                            if (typeof _callback == "function") {
                                _callback()
                            }
                        }
                    });
                    break;
            }
            if (!$el.hasClass('toast-popup-wrap') && typeof devFn.$lastFocusing == "object") {
                devFn.$lastFocusing.focus();
            }


        }

        // 팝업 전체 닫기
        // 팝업 전체 닫기
        function closeAll(_callback) {
            offscrolled();
            dimm(false);
            close($popupWrp);
        }

        // 딤제어
        // 딤제어 (false : 팝업안보임)
        function dimm(_boo, _duration) {
            var _toggle;
            if (_boo == false) {
                _toggle = 0
            } else {
                _toggle = .5
            }
            var _duration = typeof _duration !== "undefined" ? _duration : 0;
            if (_boo) {
                $dimm.show();
            }

            gsap.to($dimm, _duration, {
                alpha: _toggle,
                overwrite: true,
                onComplete: function () {
                    if (!_boo) {
                        $dimm.hide();
                    }
                }
            });
        }

        // 팝업 리셋
        // 팝업 리셋
        function reset() {
            closeAll();
            set();
        }

        // body scroll able
        function onscrolled() {
            var _offtop = $(window).scrollTop();
            saveScroll = _offtop;
            $body.css({
                "position": "fixed",
                "width": "100%",
                "top": -saveScroll
            })
            $html.css("overflow-y", "scroll")
        }

        // body scroll disalbed
        function offscrolled() {
            $body.attr("style", "");
            $html.attr("style", "");
            $(window).scrollTop(saveScroll);
        }

        return {
            init: init,
            open: open,
            close: close,
            reset: reset,
            closeAll: closeAll,
            reInit: reInit,
            dimm: dimm,
            set: set,
            onscrolled: onscrolled,
            offscrolled: offscrolled,
            group: "pass",
        }
    }





    // uiTooltip
    var uiTooltip = function () {
        var $btn = $('.ui-tooltip-open'),
            $closeBtn = $('.ui-tooltip-close'),
            $popupWrp = $('.ui-tooltip'),
            $buAll = $bu = $('.ui-tooltip-arrow', $btn);

        function init() {

            bindEvent();

            return this;
        }

        function bindEvent() {

            $btn.on("click", function (e) {
                e.preventDefault();
                var $this = $(this),
                    $tg = $this.data('tooltip-target'),
                    $bu = $this.find('.ui-tooltip-arrow');

                $bu.stop().fadeIn(500);
                open($tg);
            });

            $closeBtn.on("click", function (e) {
                e.preventDefault();
                var $this = $(this);

                $buAll.stop().fadeOut(500);
                close($this.closest($popupWrp));
            });

        }


        // 툴팁 팝업 열기
        // 툴팁 팝업 열기
        function open($el, _callback) {
            var $el = $($el);

            $el.stop().fadeIn(500, function () {
                if (typeof _callback == "function") {
                    _callback();
                }
            });

            var _scrollTop = typeof $el.data('scroll') !== "undefined" ? $el.offset().top - $(window).outerHeight() / 3 : undefined;

            if (typeof _scrollTop == "number") {
                devFn.ui.scrollTop(_scrollTop)
            }

        }

        // 툴팁 팝업 닫기
        // 툴팁 팝업 닫기
        function close($el, _callback) {
            $el.stop().fadeOut(500, function () {
                if (typeof _callback == "function") {
                    _callback();
                }
            })
        }

        return {
            init: init,
            open: open,
            close: close,
            group: $('.ui-tooltip'),
        }
    }






    // uiDropDownBox
    var uiDropDownBox = function () {

        var _optDefault = { // 드랍다운 기본 옵션
            duration: .35,
            _easing: "Power2.easeInOut",
        }

        function init() {

            bindEvent('.ui-dropdown');

            return this;
        }

        function bindEvent($el) {
            // 드랍다운 열고 닫기
            $($el).on("click", ".ui-dropdown-toggle", function (e) {
                e.preventDefault();
                var $this = $(this),
                    $el = $this.closest('.ui-dropdown');
                if ($this.hasClass('on') || $this.closest('.ui-dropdown-wrapper').hasClass("disabled")) {
                    close($el);
                } else {
                    open($el);
                }
            });

            // 드랍다운 포커스 아웃했을때 루프
            $($el).on("focusout", "a,button", function (e) {
                var $this = $(this),
                    $el = $this.closest('.ui-dropdown'),
                    $relatedTg = $(e.relatedTarget).closest('.ui-dropdown');

                if ($relatedTg.data("index") == $el.data("index")) {
                    return false;
                } else if ($this.hasClass('')) {}

                close($el);
            });

            // 드랍다운 자식 클릭했을때 텍스트 변경
            $($el).on("click", "a.ui-index-text,button.ui-index-text", function (e) {
                var $el = $(this).closest('.ui-dropdown');
                textChange($el, $(this));
                close($el);
            });

            set($el);
        }

        function set($el) {
            $($el).each(function (_idx) {
                var $this = $(this),
                    $lists = $this.find(".ui-list"),

                    $listsWrp = $this.find(".ui-dropdown-wrapper"),
                    _isType = typeof $this.data('type') !== "undefined" ? $this.data('type') : $this.data('type', "static");
                var _type = $this.data('type');

                var _motionSet;

                switch (_type) {
                    case "static":
                        _motionSet = {
                            display: "none",
                            overwrite: true,
                        }
                        break;
                    case "slide":
                        $lists.attr("style", "");

                        var $listsH = $lists.outerHeight(),

                            _motionSet = {
                                height: 0,
                                display: "none",
                                overwrite: true,
                            };

                        $lists.data('height', $listsH);
                        break;
                };
                // ui-dropdown
                $this.attr({
                    'data-index': _idx + 1,
                    "style": "z-index:" + ($($el).length + 5 - _idx) + ""
                })
                // ui-dropdown-wrapper
                $listsWrp.removeClass('open')
                // ui-list
                gsap.set($lists, _motionSet);
            });
        }

        function reInit() {

            $('.ui-dropdown').off("click focusout focusin");

            bindEvent('.ui-dropdown');

            set('.ui-dropdown');
        }

        // 드랍다운 열기
        function open(_target) {
            var $el = $(_target).find('.ui-list'),
                $btn = $(_target).find('.ui-dropdown-toggle'),
                $wrapper = $(_target).find('.ui-dropdown-wrapper'),
                _type = $(_target).data('type'),
                _focusing = $(_target).data('focusing');

            $btn.addClass('on');

            $wrapper.addClass('open');
            $el.show();
            switch (_type) {
                case "static":

                    break;
                case "slide":
                    gsap.to($el, _optDefault.duration, {
                        height: $el.data('height'),
                        display: "block",
                        ease: _optDefault._easing,
                        overwrite: true,
                    })
                    break;
            };

            if (_focusing == "true" || _focusing == true) {
                devFn.ui.scrollTop($(_target));
            }
        }

        // 드랍다운 닫기
        function close(_target) {
            var $el = $(_target).find('.ui-list'),
                $btn = $(_target).find('.ui-dropdown-toggle'),
                $wrapper = $(_target).find('.ui-dropdown-wrapper'),
                _type = $(_target).data('type');
            $btn.removeClass('on');

            $wrapper.removeClass('open');

            switch (_type) {
                case "static":
                    $el.hide();

                    break;
                case "slide":
                    gsap.to($el, _optDefault.duration, {
                        height: 0,
                        display: "block",
                        ease: _optDefault._easing,
                        overwrite: true,
                        onComplete: function () {
                            $el.hide();
                        }
                    })

                    break;
            };

        }

        // 부모엘리먼트, 자식엘리먼트 또는 자식엘리먼트 index
        function click($el, $child) {
            var $el = $($el),
                $child = typeof $child !== "number" ? $($child, $el) : $child;

            if (typeof $child == "number") {
                $el.find('.drop-down-item').eq($child).find('.ui-index-text').trigger("click");
            } else {
                $child.trigger("click");
            }
        }

        // 부모엘리먼트, 자식엘리먼트 또는 자식엘리먼트 index
        function textChange($el, $child) {

            var $this = typeof $child !== "number" ? $($child, $el) : $('.ui-index-text', $el).eq($child),
                $text = $this.text(),
                $btn = $el.find('.ui-dropdown-toggle'),
                $indexTxt = $el.find('.drop-down-index');

            $indexTxt.text($text).addClass('on');

            $btn.focus();
        }

        return {
            init: init,
            bindEvent: bindEvent,
            open: open,
            close: close,
            reInit: reInit,
            click: click,
            textChange: textChange,
            set: set,
            group: $('.ui-dropdown'),
        }
    }





    // uiTab
    var uiTab = function () {
        var $el = $('.ui-tab');

        function init() {
            set();
            bindEvent();
            return this;
        }

        function bindEvent() {

            $el.on("click", ".ui-tab-btn", function (e) {
                e.preventDefault();
                var $this = $(this);
                change($this);

                if ($this.closest('.ui-tab').css("overflow").includes("auto")) {
                    tabFocusing($this);
                }

            });
        }

        function set() {

            $('.ui-tab-btn').each(function () {
                if ($(this).hasClass('on')) {
                    change($(this));
                }
            });
        }

        function change(_el, _indexNum) {
            var $group = _el.closest('.ui-tab'),
                $groupTg = _el.closest('[data-tab-target]').data('tab-target'),
                _index = _el.closest('li').index();

            if (typeof _indexNum !== "undefined") {
                _index = _indexNum;
            }

            $group.find('a,button').removeClass('on');
            $group.find('a,button').eq(_index).addClass('on')

            $($groupTg).children(".ui-tab-box").hide();
            $($groupTg).children(".ui-tab-box").eq(_index).show();

        }

        function tabFocusing(_el) {
            // _el = 선택된 a 태그
            var $scrollTg = _el.closest('.ui-tab'),
                _idx = _el.closest("li").index(),
                _left = 0;
            for (var i = 0; i < _idx; i++) {
                _left = _left + _el.closest("li").outerWidth();
            }
            _left = _left - ($scrollTg.outerWidth() / 6);

            gsap.to($scrollTg, .5, {
                scrollLeft: _left,
                ease: Power2.easeOut,
                overwrite: true,
            })
        }

        return {
            init: init,
            change: change,
            group: $(".ui-tab"),
        }
    }





    // uiResizeinit 반응형 대응
    var uiResizeinit = function () {

        // 디바이스 변경후
        function _deviceChange() {

            if (devFn.popup) {
                devFn.popup.reset(); // 팝업 다 초기화 후 닫기
            }

            if (devFn.accordion) {
                devFn.accordion.close($('.accordion-item')); // 아코디언 초기화 후 다 닫기
            }

        }

        // 리사이즈 후 항상
        function _alwaysChange() {

            if (devFn.scrollTrigger) {
                setTimeout(function () {
                    devFn.scrollTrigger.stickiesReinit(); // 스틱키 버튼 위치값 조정
                }, 500)
            }

        }

        // 디바이스 변경후 모바일일때만
        function _mobileChange() {
            if (devFn.ui) {
                devFn.ui.uiScrollbar("destroy"); // 커스텀 스크롤 전부 destroy
            }
        }

        // 디바이스 변경후 PC일때만
        function _webChange() {
            if (devFn.ui) {
                devFn.ui.uiScrollbar(); // 커스텀 스크롤 전부 init();
            }
        }


        return {
            _deviceChange: _deviceChange,
            _alwaysChange: _alwaysChange,
            _mobileChange: _mobileChange,
            _webChange: _webChange,
            group: "pass",
        }
    }





    // uiSample
    var uiInputControl = function () {
        var $delBtn = $('<button class="btn-input-txt-reset ui-reset-btn" type="button"> <span class="hide-txt">입력 텍스트 초기화</span> <i class="ico-input-txt-reset" aria-hidden="true"></i> </button>');

        function init() {

            bindEvent();

            return this;
        }

        function bindEvent() {

            $('.ui-input-reset').on("click", '.ui-reset-btn', function (e) {
                e.preventDefault();
                var $el = $(this),
                    $target = $el.closest('.ui-input-reset').find('input');
                valRemove($target);
            });

        }

        function valRemove($el) {
            $($el).val("");
            $($el).focus();
        }

        // function datePickerInit($el) {
        //     var date = new Date(),
        //         year = date.getFullYear(),
        //         month = date.getMonth(),
        //         day = date.getDate(),
        //         startDate = new Date(year, month, day + 1),
        //         endDate = new Date(year, month, day + 14);

        //     var instance = new tui.DatePicker($el, {
        //         // date:date,
        //         language: 'ko',
        //         calendar: {
        //             showToday: false
        //         },
        //         selectableRanges: [
        //             [startDate, endDate],
        //         ],
        //         input: {
        //             element: '.ui-data-picker-input',
        //             format: 'yyyy-MM-dd HH:mm'
        //         },
        //         openers: ['.btn-input-calendar'],
        //         timePicker: {
        //             // language: 'ko',

        //             meridiemPosition: 'left',
        //             minuteStep: 60,
        //             // am: "오전",
        //             // pm: "오후",

        //             disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 18, 19, 20, 21, 22, 23],
        //             // inputType: 'spinbox',
        //             // usageStatistics:false,
        //             showMeridiem: false, // 오전오후 표시
        //         },
        //         type: 'date',
        //     });

        //     instance.on("open", function (e) {
        //         instance._timePicker._hour = 11;
        //         $('.tui-timepicker .tui-timepicker-select').eq(0).val("11").trigger("change");
        //     })
        // }

        return {
            init: init,
            valRemove: valRemove,
            group: $('.input-txt-auto ,.ui-input-reset,.btn-input-search,.search-btn'),
        }
    }




    // uiScrollTrigger
    var uiScrollTrigger = function () {

        var $elStickies = $('.ui-sticky'), // 헤더밑에 붙기
            $elEntered = $('.ui-entered'), // 일정구간 도착시 인터렉션
            _nextTop;

        var gsapScroll,
            scrollArray = [];

        function init() {

            if ($elStickies.length) {
                stickies();
            }

            if ($elEntered.length) {
                entered();
            }

            setTimeout(function () {
                ScrollTrigger.refresh();
            }, 100)

            return this;
        }

        function stickies() {

            _nextTop = $('.header-continer').outerHeight();

            $elStickies.each(function () {

                var _thisH = $(this).outerHeight(),
                    $stickyItem = $(this).find(".ui-sticky-item"),
                    _offTop = _nextTop;
                $(this).height($stickyItem.outerHeight());
                gsapScroll = ScrollTrigger.create({
                    trigger: $(this),
                    start: "top top+=" + _nextTop + "rem",
                    endTrigger: $body,
                    // markers: true,
                    onEnter: function () {
                        $stickyItem.addClass("sticky")
                        if ($('.sticky').length > 0) {
                            $(".header-continer").addClass('none-shadow')
                        }
                    },
                    onLeaveBack: function () {
                        $stickyItem.removeClass("sticky");
                        $stickyItem.attr("style", "");
                        if (!$('.sticky').length) {
                            $(".header-continer").removeClass('none-shadow')
                        }
                    },
                })

                scrollArray.push(gsapScroll);
                _nextTop += _thisH;
            });

        }

        function stickiesReinit() {

            if (scrollArray.length > 0) {
                scrollArray.forEach(function (e, _idx) {
                    e.kill();
                });
                scrollArray = [];
            }
            stickies();

        }


        function entered() {

            $elEntered.each(function () {

                var $this = $(this),
                    $thiscustomTop = $this.data("entered-top");
                _defaultTop = "20%";

                if (typeof $thiscustomTop !== "undefined") {
                    _defaultTop = $thiscustomTop;
                }
                ScrollTrigger.create({
                    trigger: $this,
                    start: "top top+=" + _defaultTop + "",
                    onEnter: function () {
                        $this.addClass("entered")
                    },
                    onLeaveBack: function () {
                        $this.removeClass("entered")
                    }
                });
            })
        }

        return {
            init: init,
            stickiesReinit: stickiesReinit,
            group:  $('.ui-sticky, .ui-entered'),
        }
    }
}(jQuery);