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

			$('.tab_basic').eq(1).find('>li>a').on('click', function(e){
				e.preventDefault();

				var index = $(this).closest('li').index();

				if(index == 0){
					$('._test1, ._test2').hide();
					$('._test1').show().slider();
				}else{
					$('._test1, ._test2').hide();
					$('._test2').show();
					setTimeout(function(){
						$('._test2').slider();
					}, 1000);
				}
			});

			setTimeout(function(){
				if($('body').hasClass('noscroll')){
					$(window).off('scroll');
				}
			}, 1000);

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

			registUI('.filebox', uiFileUploadStyle, false);
			registUI('.photo_list', uiPhotoList, false);	// photo list에만 적용
			registUI('.main_v_wrap', uiMainVisual, false);
			registUI('.onair_banner_wrap', uiMainOnAir, false);	// 메인에만 적용
			registUI('.rolling_rank_bx', uiRank, false);
			registUI('.pro_gnb', uiProgramGNB, true); // 프로그램 메인, 뷰에만 적용
			registUI('.v_player_con', uiContentExpand, false);	// 프로그램 공통
			registUI('.ui_expand_layer', uiExpandLayer, false);	// 컨텐츠 접기 펴기
			registUI('.sch_contents', uiSortBox, false);	// 정렬기준/검색범위 펼치기 접기	search/sch03	// 클래스나 아이디로 변경필요
			registUI('.ui_brand_movie', uiBrandMovie, false);   // 회사소개 > jtbc소개 > 브랜드 영상에만 쓰임
			registUI('.magazine_cont', uiMagazine, false);	// 매거진
			registUI('.ui_accordion', uiAccordion, false);
			registUI('.ui_accordion_table', uiAccordionTable, false);
			// registUI('.cont_loading', uiLoading, false);
			registUI('.ui_btn_share', uiShareMore, false);	// sns 더보기 레이어 팝업
			//registUI('.btn_file_save', uiBtnFileSave, false);	// 파일저장
			registUI('.ui_vertical_rolling', uiVerticalRolling, false);
			registUI('.ui_poll', uiProgramPoll, false);
			registUI('.ui_vod_player_zone', uiVodPlayer, false);
			registUI('.ui_repaly_info_accordion', uiReplayInfoAccordion, false);
			registUI('.tab_relation', uiTabRelation, true);
			registUI('.browserupgrade', uiBrowserupgrade, true);
            registUI('.ui_date_schedule', uiDateSchedule, false);
            registUI('.top_lnb_area', uiDirectClick, false);

			$('.ui_vod_home_slider').vodHomeSlider();
			$('.ui_slider').slider();

			// 공통 적용
			textPlaceHolderInit(); // ie7,8 가능한 placeholder

			formControl.init();
			uiTab.init();
			globalCommonScript.init();
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
			globalCommonScript.init();
		}

		return {init: init};
	})();

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

			globalCommonScript.init();
		}

		return {init: init};
	})();

	// selectbox
	var SelectboxUI = function(){
		var el, selTitle;
		var $text, $list, $select;
		var selectedIndex, htmlSelectList, selectListTimer = -1;

		function init(_el){
			el = $(_el);

			setup();

			el.addClass('ui_complete');

			return this;
		}

		function setup(){
			$text = el.find('> .select_result');
			$list = el.find('>ul');
			$select = el.find('>select');
			selectedIndex = -1;

			htmlSelectList = '';

			if($select.attr('disabled')){
				el.addClass('disabled');
			}else{
				el.removeClass('disabled');
			}

			setList();

			setSelectedIndex(selectedIndex);

			bindEvents();
		}

		function bindEvents(){
			$select.on('change', function(e){
				setSelectedIndex();
			});

			if(el.hasClass('disabled')){
				$text.on('click', function(e){
					e.preventDefault();
				});
			}else{
				$text.on('click', function(e){
					e.preventDefault();

					if(!el.hasClass('active')){
						showList();
					}else{
						hideList();
					}
				});
			}
		}

		function showList(){
			el.addClass('active');

			var windowInnerHeight = window.innerHeight || $(window).height();
			if(!el.data('origin-top')){
				el.data('origin-top', $list.css('top'));
			}

			if(el.hasClass('reversal')){
				$list.addClass('reversal');
			}else{
				if(windowInnerHeight > $list.height() && el.offset().top + el.height() + $list.height() - $(window).scrollTop() > windowInnerHeight){
					// $list.css({top: -$list.height()});
					$list.addClass('reversal');
				}else{
					$list.removeClass('reversal');//$list.css({top: el.data('origin-top')});
				}
			}

			$list.show().css({zIndex: 10});
			setTimeout(function(){
				$list.addClass('on');
				if($list.find('>li[data-selected=true]').length > 0){
					$list.find('>li[data-selected=true] a').focus();
				}
			}, 0);

			$list.off('.listEvent').on('click.listEvent', '>li>a', function(e){
				e.preventDefault();

				var index = $(this).closest('li').index();

				$select.get(0).selectedIndex = index;

				$select.trigger('change');
				setSelectedIndex();
				hideList();
			}).on('focusin.listEvent', function(e){
				clearTimeout(selectListTimer);

				$list.find('>li').removeClass('on');
				$(e.target).closest('li').addClass('on');
			}).on('focusout.listEvent', function(e){
				// selectListTimer = setTimeout(function(){
				// 	hideList(true);
				// }, 100);
			}).on('mouseover.listEvent', function(e){
				$list.find('>li').removeClass('on');
				$(e.target).closest('li').addClass('on');
			});

			$('body').off('mousedown').on('mousedown.listEvent', function(e){
				if($(e.target).closest(el).length <= 0){
					hideList(true);
				}
			});

			$(document).off('keyup').on('keyup.listEvent', function(e){
				if(e.keyCode == 27){
					hideList();
				}
			});

			$list.off('mousewheel.listEvent DOMMouseScroll.listEvent').on('mousewheel.listEvent DOMMouseScroll.listEvent', function(e){
				var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

				if(delta > 0 && $(this).scrollTop() <= 0){
					return false;
				}
				if(delta < 0 && $(this).scrollTop() >= this.scrollHeight - $(this).height()){
					return false;
				}

				return true;
			});
		}

		function hideList(notFocus){
			el.removeClass('active');
			$list.hide().css({zIndex: 5}).removeClass('on');

			$list.off('.listEvent');
			if(!notFocus){
				$text.focus();
			}

			$('body').off('.listEvent');
			$(document).off('.listEvent');
			$list.off('.listEvent');
		}

		function setList(){
			htmlSelectList += '<a href="#" class="select_result"></a>';

			htmlSelectList += '<ul class="sel_list">';

			$select.find('>option').each(function(idx, obj){
				var value = $(this).attr('value');
				if(value){
					value = ' data-value="' + value + '"';
				}else{
					value = '';
				}
				htmlSelectList += '<li><a href="#"' + value + '>' + $(this).text() + '</a></li>';
			});
			htmlSelectList += '</ul>';

			$list.remove();

			el.find('> .select_result').remove();
			el.append(htmlSelectList);

			$list = el.find('>ul');
			$text = el.find('> .select_result');
			$list.width(el.width());
			$text.width(el.width() - 22-18);

			selTitle = el.find('select').attr('title');
			// if(selTitle.indexOf('선택') == -1){
			// 	selTitle = selTitle + ' 선택'
			// }
			$text.attr('title', selTitle);

			if($select.find('>option').length > 6){
				$list.css({height: 252});
			}else{
				$list.css({height: 'auto'});
			}
		}

		function setSelectedIndex(){
			if($select.length <= 0){
				selectedIndex = 0;
			}else{
				selectedIndex = $select.get(0).selectedIndex;
			}

			$text.text($list.find('>li>a').eq(selectedIndex).text());
			$list.find('>li').removeClass('on').eq(selectedIndex).addClass('on');
			$list.find('>li').attr({'data-selected': false}).eq(selectedIndex).attr({'data-selected': true});
		}

		function refresh(){
			setup();
		}

		return {
			init: init
			, refresh: refresh
		};
	};

	// checkbox
	var CheckboxUI = function(){
		var el;
		var $input, $text;
		var checked, disabled;

		function init(_el){
			el = $(_el);

			setup();
			el.addClass('ui_complete');

			return this;
		}

		function setup(){
			$input = el.find('input:checkbox');
			$text = el.find('label > span');

			refresh();

			bindEvents();
		}

		function bindEvents(){
			$input.on('focusin', function(e){
				$text.addClass('focus');
			}).on('focusout', function(e){
				$text.removeClass('focus');
			}).on('change', function(e){
				refresh();
			});
		}

		function refresh(){
			checked = $input.prop('checked') || $input.prop('checked') == 'checked';
			disabled = $input.prop('disabled') || $input.prop('disabled') == 'disabled';

			/*
			기본형: .checkbox_basic
			비활성: .checkbox_disabled
			체크: .checkbox_checked
			비활성체크: .checkbox_disabled_checked
			*/

			$text.removeClass('checkbox_basic checkbox_disabled checkbox_checked checkbox_disabled_checked');
			if(checked && disabled){
				$text.addClass('checkbox_disabled_checked');
			}else if(checked){
				$text.addClass('checkbox_checked');
			}else if(disabled){
				$text.addClass('checkbox_disabled');
			}else{
				$text.addClass('checkbox_basic');
			}
		}

		return {
			init: init
			, refresh: refresh
		};
	};

	// radio
	var RadioUI = function(){
		var el;
		var $input, $text, $radioSet;
		var checked, disabled;

		function init(_el){
			el = $(_el);

			setup();
			el.addClass('ui_complete');

			return this;
		}

		function setup(){
			$input = el.find('input:radio');
			$text = el.find('label > span');
			if($input.attr('name')){
				$radioSet = $('.input_radio input[name=' + $input.attr('name') + ']');
			}else{
				$radioSet = $;
			}


			refresh();

			bindEvents();
		}

		function bindEvents(){
			$input.on('focusin', function(e){
				$text.addClass('focus');
			}).on('focusout', function(e){
				$text.removeClass('focus');
			}).on('change', function(e){
				$radioSet.each(function(idx, obj){
					$(obj).data('radio').refresh();
				});
			});
		}

		function refresh(){
			checked = $input.prop('checked') || $input.prop('checked') == 'checked';
			disabled = $input.prop('disabled') || $input.prop('disabled') == 'disabled';

			/*
			기본형: .radio_basic
			비활성: .radio_disabled
			체크: .radio_checked
			비활성체크: .radio_disabled_checked
			*/

			$text.removeClass('radio_basic radio_disabled radio_checked radio_disabled_checked');
			if(checked && disabled){
				$text.addClass('radio_disabled_checked');
			}else if(checked){
				$text.addClass('radio_checked');
			}else if(disabled){
				$text.addClass('radio_disabled');
			}else{
				$text.addClass('radio_basic');
			}
		}

		return {
			init: init
			, refresh: refresh
		};
	};

	// form controls
	window.formControl = (function(){
		// var selectEl, checkEl, radioEl;

		function init(){
			// selectEl = $('.selectbox_wrap:not(.ui_complete)');
			// checkEl = $('.input_checkbox:not(.ui_complete)');
			// radioEl = $('.input_radio:not(.ui_complete)');

			initSelect();
			initCheckbox();
			initRadio();
		}

		function initSelect(){
			$('.selectbox_wrap').each(function(idx, obj){
				var $obj = $(obj);
				var $select = $obj.find('select');

				if($obj.hasClass('ui_complete')){
					if($select.data('selectbox')) $select.data('selectbox').refresh();
				}else{
					var selectbox = new SelectboxUI();
					selectbox.init($obj);
					$select.data('selectbox', selectbox);
				}
			});
		}

		function initCheckbox(){
			$('.input_checkbox').each(function(idx, obj){
				var $obj = $(obj);
				var $input = $obj.find('input');

				if($obj.hasClass('ui_complete')){
					if($input.data('checkbox')) $input.data('checkbox').refresh();
				}else{
					var checkbox = new CheckboxUI();
					checkbox.init($obj);
					$input.data('checkbox', checkbox);
				}
			});
		}

		function initRadio(){
			$('.input_radio').each(function(idx, obj){
				var $obj = $(obj);
				var $input = $obj.find('input');

				if($obj.hasClass('ui_complete')){
					if($input.data('radio')) $input.data('radio').refresh();
				}else{
					var radio = new RadioUI();
					radio.init($obj);
					$input.data('radio', radio);
				}
			});
		}

		return {
			init: init
			, initRadio: initRadio
			, initCheckbox: initCheckbox
			, initSelect: initSelect
		}
	})();

	var Slider = function(){
		var el, btnLeft, btnRight, sliderWrap, sliderBody, sliderItem;
		var currentId, pageSize, pastId, activeItemIndex;
		var sliderWidth;
		var lastItemWidth;
		var options;
		var btnDot, btnPlay, isPlay, direction;
		var autoTimer, autoTimerSec, currentClass;

		function init(_el, _options){
			if(!el){
				el = $(_el);
			}

			if(el.hasClass('ui_complete')){
				return this;
			}

			// console.log(el.attr('data-lazy-load') +',,,,,,,,,,,'+ el.attr('data-lazy-load-ok'));
			// console.log(!el.attr('data-lazy-load') || el.attr('data-lazy-load') && !el.attr('data-lazy-load-ok'));
			if(!el.attr('data-lazy-load') || el.attr('data-lazy-load') && !el.attr('data-lazy-load-ok')){
				options = {
					speed: 0.5
					, entire: false
					, fade: false
				};

				if(el.attr('data-slider-entire') != undefined){
					options.entire = el.attr('data-slider-entire');
				}

				if(el.attr('data-slider-fade') != undefined){
					options.fade = el.attr('data-slider-fade');
				}

				if(el.attr('data-slider-three') != undefined){
					options.three = el.attr('data-slider-three');
				}

				if(el.attr('data-slider-infinite') != undefined){
					options.infinite = el.attr('data-slider-infinite');
				}

				if(el.attr('data-slider-initno') != undefined){
					options.initno = el.attr('data-slider-initno');
				}

				options = $.extend(true, options, _options);

				currentId = 0;
				pastId = 0;
				btnLeft = el.find('.ui_btn_left');
				btnRight = el.find('.ui_btn_right');
				sliderWrap = el.find('.ui_slider_wrap');
				sliderBody = el.find('.ui_slider_body');
				sliderItem = sliderBody.find('.ui_slider_item');
				btnDot = el.find('.ui_btn_dot');
				btnPlay = el.find('.ui_btn_play');
				autoTimerSec = 3000;

				if(btnPlay.length){
					isPlay = true;
				}

				if(options.three){
					sliderItem.each(function(idx, obj){
						$(obj).find('>li').eq(0);
						$(obj).find('>li').eq(1);
						$(obj).find('>li').eq(2).addClass('w415');
					});
				}
			}

			sliderWidth = sliderWrap.width();
			pageSize = sliderItem.length;
			sliderBody.css({width: (pageSize*100)+'%'});
			// console.log(sliderItem, pageSize, sliderItem.eq(pageSize-1));
			lastItemWidth = sliderItem.eq(pageSize-1).width();

			if(el.attr('data-lazy-load') && !el.attr('data-lazy-load-ok')){
				el.attr('data-lazy-load-ok', true);

				if(!el.is(':visible')){
					return this;
				}
			}

			if(options.infinite && pageSize > 1){
				// sliderWrap.css({position: 'relative'});
				// sliderBody.css({width: '100%'});
				// sliderItem.css({position: 'absolute'});

				if(isIE8){
					var tempSlideBodyWidth = sliderItem.eq(0).width();
					var tempSlideBodyHeight = sliderItem.eq(0).height();

					TweenMax.set(sliderItem, {position: 'absolute', left: 0, width: tempSlideBodyWidth});
					sliderBody.height(tempSlideBodyHeight);
					for(var i = 1 ; i < pageSize ; i++){
						TweenMax.set(sliderItem.eq(i), {left: -sliderWidth});
					}
				}else{
					for(var i = 1 ; i < pageSize ; i++){
						TweenMax.set(sliderItem.eq(i), {marginLeft: -sliderWidth});
					}

					TweenMax.set(sliderItem, {x: sliderWidth});
					TweenMax.set(sliderItem.eq(0), {x: 0});
					TweenMax.set(sliderItem.eq(-1), {x: -sliderWidth});
				}
			}

			// 한페이지가 안될경우
			if(pageSize <= 1){
				btnLeft.hide();
				btnRight.hide();

				// 자동재생 오른쪽 정렬
				if(el.find('.btn_auto').length){
					el.find('.btn_auto').addClass('alone');
				}
			}

			// 자동재생 정렬 후 나타남
			if(el.find('.btn_auto').length){
				el.find('.btn_auto').show();
			}

			// 프로그램 상세 탑영역 이미지 하나일 경우 높이조절 필요
			if(pageSize <= 1 && el.hasClass('pro_top_area')){
				var proLayout = $('.pro_layout');
				var proGnb = $('.pro_gnb');

				proLayout.addClass('alone');

				// sliderItem.find('img').imagesLoaded().progress(function(instance, image) {
				// 	proLayout.height($(image.img).height());
				// 	// console.log($(image.img).height(), proGnb.height());
				// 	proGnb.css({top: $(image.img).height() - proGnb.height()});
				// 	proGnb.show();

				// 	proGnb.data('_inst').refresh();

				// 	image.img.onload = function(){
				// 		proLayout.height($(image.img).height());
				// 		// console.log($(image.img).height(), proGnb.height());
				// 		proGnb.css({top: $(image.img).height() - proGnb.height()});
				// 		proGnb.show();

				// 		proGnb.data('_inst').refresh();
				// 	}

				// });

				if(location.host.indexOf('local') != -1 || location.host.indexOf('e-dev') != -1){
					$(document).on('ux_images_loaded', function(e, data){
						// console.log(data);
						if($(data).closest(el).length){
							// console.log(1);
							proLayout.height(el.height());
							// console.log($(image.img).height(), proGnb.height());
							proGnb.css({top: el.height() - proGnb.height()});
							proGnb.show();

							proGnb.data('_inst').refresh();
						}
					});
				}else{
					el.imagesLoaded().progress(function(instance, image) {
						proLayout.height($(image.img).height());
						// console.log($(image.img).height(), proGnb.height());
						proGnb.css({top: $(image.img).height() - proGnb.height()});
						proGnb.show();

						proGnb.data('_inst').refresh();

						image.img.onload = function(){
							proLayout.height(el.height());
							// console.log($(image.img).height(), proGnb.height());
							proGnb.css({top: el.height() - proGnb.height()});
							proGnb.show();

							proGnb.data('_inst').refresh();
						}
					});
				}

				return;
			}

			disableBtn();

			bindEvents();

			if(btnDot.length){
				var dotHTML = '';
				sliderItem.each(function(idx, obj){
					dotHTML += '<li class="ui_dot"><a href="">총 '+pageSize+'개 컨텐츠 중 '+(idx+1)+'번째</a></li>';
				});
				btnDot.prepend(dotHTML);
				btnDot.find('.ui_dot:eq(0)').addClass('on');
				initDot();

				if(btnPlay.hasClass('ui_play_type1')){
					// console.log(btnDot.width());
					var btnDotDivideWidth = -btnDot.width()/2;
					btnDot.css({marginLeft: btnDotDivideWidth});
					btnPlay.css({marginLeft: -btnPlay.width()/2 - btnDotDivideWidth + btnPlay.find('a').width() - 5});
				}else if(btnPlay.hasClass('ui_play_type2')){
					// console.log(btnDot.width());
					// var btnDotDivideWidth = -btnDot.width()/2;
					// btnDot.css({marginLeft: btnDotDivideWidth});
					// btnPlay.css({marginLeft: -btnPlay.width()/2 - btnDotDivideWidth + btnPlay.find('a').width() - 5});
				}

				btnDot.show();
			}

			if(btnPlay.length){
				btnPlay.show();
				initPlay();
			}

			el.addClass('ui_complete');

			// if(el.attr('data-slider-scrollload')){

			// }else{

			// }
			// console.log(sliderItem.find('>li.on').closest('.ui_slider_item').index());
			if(sliderItem.find('>li.on').length){
				activeItemIndex = sliderItem.find('>li.on').closest('.ui_slider_item').index();
				currentId = activeItemIndex;
				moveSlide(0);
			}else{
				if(options.initno){
					currentId = options.initno;
					moveSlide(0);
				}else{
					loadImages(0);
				}

				addCurrentClass(currentId);
			}

			return this;
		}

		function bindEvents(){
			btnLeft.on('click', function(e){
				e.preventDefault();

				moveLeft();
			});

			btnRight.on('click', function(e){
				e.preventDefault();

				moveRight();
			});
		}

		function moveLeft(){
			// console.log('moveLeft');
			direction = 'LEFT';

			if(options.infinite){
				if(currentId > 0){
					--currentId;
				}else{
					currentId = pageSize-1;
				}
				moveSlide();
			}else{
				if(currentId > 0){
					--currentId;
				}else{
					currentId = 0;
				}
				moveSlide();
			}
		}

		function moveRight(){
			// console.log('moveRight');
			direction = 'RIGHT';

			if(options.infinite){
				if(currentId < pageSize-1){
					++currentId;
				}else{
					currentId = 0;
				}
				moveSlide();
			}else{
				if(currentId < pageSize-1){
					++currentId;
				}else{
					currentId = pageSize-1;
				}
				moveSlide();
			}
		}

		function initDot(){
			btnDot.find('.ui_dot').on('click', function(e){
				e.preventDefault();

				var index = $(this).index();

				btnDot.find('.ui_dot').removeClass('on').eq(index).addClass('on');

				currentId = index;
				moveSlide();
			});
		}

		function play(){
			autoTimer = setInterval(function(){
				if(document.hasFocus()){
					currentId = (currentId+1)%pageSize;
					// console.log(pastId, currentId);
					btnDot.find('.ui_dot').removeClass('on').eq(currentId).addClass('on');
					moveSlide();
				}
			}, autoTimerSec);
		}

		function stop(){
			clearInterval(autoTimer);
		}

		function initPlay(){
			el.on('mouseenter', function(e){
				stop();
			}).on('mouseleave', function(e){
				if(isPlay){
					play();
				}
			});

			btnPlay.on('click', 'a', function(e){
				e.preventDefault();

				if(btnPlay.hasClass('play')){
					btnPlay.removeClass('play');

					play();
					isPlay = true;
				}else{
					btnPlay.addClass('play');

					stop();
					isPlay = false;
				}
			});

			if(pageSize <= 1){
				btnPlay.hide();
				btnDot.hide();
			}else{
				play();
				isPlay = true;
			}
		}

		function moveSlide(_speed){
			var speed;
			sliderWrap.scrollLeft(0);
			if(options.fade){
				if(_speed === 0){
					speed = _speed;
				}else{
					speed = options.speed*2;
				}

				stop();
				if(isPlay){
					play();
				}

				addCurrentClass(currentId);

				TweenMax.to(sliderItem.eq(pastId), speed, {autoAlpha: 0, ease: Power2.easeInOut});
				TweenMax.to(sliderItem.eq(currentId), speed, {autoAlpha: 1, ease: Power2.easeInOut});
			}else if(options.infinite){
				if(_speed === 0){
					speed = _speed;
				}else{
					speed = options.speed;
				}

				addCurrentClass(currentId);

				if(isIE8){
					if(direction == 'LEFT'){
						TweenMax.set(sliderItem.eq(pastId), {left: 0});
						TweenMax.set(sliderItem.eq(currentId), {left: -sliderWidth});
						TweenMax.to(sliderItem.eq(pastId), speed, {left: sliderWidth, ease: Power2.easeInOut});
						TweenMax.to(sliderItem.eq(currentId), speed, {left: 0, ease: Power2.easeInOut});
					}else if(direction == 'RIGHT'){
						TweenMax.set(sliderItem.eq(pastId), {left: 0});
						TweenMax.set(sliderItem.eq(currentId), {left: sliderWidth});
						TweenMax.to(sliderItem.eq(pastId), speed, {left: -sliderWidth, ease: Power2.easeInOut});
						TweenMax.to(sliderItem.eq(currentId), speed, {left: 0, ease: Power2.easeInOut});
					}
				}else{
					if(direction == 'LEFT'){
						TweenMax.set(sliderItem.eq(pastId), {x: 0});
						TweenMax.set(sliderItem.eq(currentId), {x: -sliderWidth});
						TweenMax.to(sliderItem.eq(pastId), speed, {x: sliderWidth, ease: Power2.easeInOut});
						TweenMax.to(sliderItem.eq(currentId), speed, {x: 0, ease: Power2.easeInOut});
					}else if(direction == 'RIGHT'){
						TweenMax.set(sliderItem.eq(pastId), {x: 0});
						TweenMax.set(sliderItem.eq(currentId), {x: sliderWidth});
						TweenMax.to(sliderItem.eq(pastId), speed, {x: -sliderWidth, ease: Power2.easeInOut});
						TweenMax.to(sliderItem.eq(currentId), speed, {x: 0, ease: Power2.easeInOut});
					}
				}
			}else{
				if(_speed === 0){
					speed = _speed;
				}else{
					speed = options.speed;
				}

				// console.log(currentId, pageSize);
				if(currentId >= pageSize-1){
					if(options.entire){
						addCurrentClass(currentId);

						if(isIE8){
							TweenMax.to(sliderBody, speed, {marginLeft: (-currentId) * sliderWidth, ease: Power2.easeInOut});
						}else{
							TweenMax.to(sliderBody, speed, {x: (-currentId) * sliderWidth, ease: Power2.easeInOut});
						}
					}else{
						if(lastItemWidth == sliderWidth){
							addCurrentClass(currentId);

							if(options.three){
								var currentItem = sliderItem.eq(currentId);
								currentItem.find('>li').eq(0).css({zIndex: 5});
							}
						}else{
							if(options.three){
								var prevItem = sliderItem.eq(currentId-1);
								var currentItemLength = sliderItem.eq(currentId).find('>li').length;

								sliderItem.find('.ui_zindex5').removeClass('ui_zindex5');
								prevItem.find('>li').eq(currentItemLength).addClass('ui_zindex5');;
							}
							addCurrentClass(currentId-1);
							addCurrentClass(currentId, 'last_current');
						}
						if(isIE8){
							TweenMax.to(sliderBody, speed, {marginLeft: (-currentId+1) * sliderWidth - lastItemWidth + (currentId*1), ease: Power2.easeInOut});
						}else{
							TweenMax.to(sliderBody, speed, {x: (-currentId+1) * sliderWidth - lastItemWidth + (currentId*1), ease: Power2.easeInOut});
						}
					}
				}else{
					if(options.three){
						var currentItem = sliderItem.eq(currentId);

						sliderItem.find('.ui_zindex5').removeClass('ui_zindex5');
						currentItem.find('>li').eq(0).addClass('ui_zindex5');
					}

					addCurrentClass(currentId);

					if(isIE8){
						if(options.entire){
							TweenMax.to(sliderBody, speed, {marginLeft: -currentId * sliderWidth, ease: Power2.easeInOut});
						}else{
							TweenMax.to(sliderBody, speed, {marginLeft: -currentId * sliderWidth + (currentId*1), ease: Power2.easeInOut});
						}
					}else{
						if(options.entire){
							TweenMax.to(sliderBody, speed, {x: -currentId * sliderWidth, ease: Power2.easeInOut});
						}else{
							TweenMax.to(sliderBody, speed, {x: -currentId * sliderWidth + (currentId*1), ease: Power2.easeInOut});
						}
					}
				}
			}

			disableBtn();

			if(lastItemWidth == sliderWidth){
				loadImages(currentId);
			}else{
				loadImages(currentId);
				loadImages(currentId-1);
			}


			pastId = currentId;
		}

		function addCurrentClass(index, etcClass){
			currentClass = 'current';
			if(etcClass){
				currentClass = etcClass;
				sliderItem.removeClass(currentClass).eq(index).addClass(currentClass);
			}else{
				sliderItem.removeClass('current last_current').eq(index).addClass(currentClass);
			}
		}

		function loadImages(index){
			sliderBody.find('.ui_slider_item').eq(index).find('img[data-src]').each(function(idx, obj){
				$(this).attr({src: $(this).attr('data-src')}).removeAttr('data-src');
			});
		}

		function disableBtn(){
			if(pageSize <= 1){
				btnLeft.addClass('disabled');
				btnRight.addClass('disabled');
			}else if(currentId <= 0){
				btnLeft.addClass('disabled');
				btnRight.removeClass('disabled');
			}else if(currentId >= pageSize-1){
				btnRight.addClass('disabled');
				btnLeft.removeClass('disabled');
			}else{
				btnLeft.removeClass('disabled');
				btnRight.removeClass('disabled');
			}
		}

		return {
			init: init
			, moveLeft: moveLeft

		};
	};

	var VodHomeSlider = function(){
		var el, btnLeft, btnRight, sliderWrap, sliderBody;
		var currentId, pageSize;
		var sliderWidth;
		var lastItemWidth;
		var directionVar;

		function init(_el){
			el = $(_el);

			if(el.hasClass('ui_complete')){
				return this;
			}

			currentId = 0;
			btnLeft = el.find('.ui_btn_left');
			btnRight = el.find('.ui_btn_right');
			sliderWrap = el.find('.ui_slider_wrap');
			sliderBody = el.find('.ui_slider_body');

			sliderWidth = sliderBody.find('.ui_slider_item').eq(0).width();
			pageSize = sliderBody.find('.ui_slider_item').length;
			// sliderBody.css({width: (pageSize*100)+'%'});
			lastItemWidth = sliderBody.find('.ui_slider_item').eq(pageSize-1).width();

			if(pageSize < 4){
				for(var i = 0 ; i < 4-pageSize ; i++){
					sliderBody.append(sliderBody.find('>li').eq(i).clone());
				}

				pageSize = sliderBody.find('.ui_slider_item').length;
			}

			TweenMax.to(sliderBody.find('>li:eq(-1)'), 0, {x: -sliderWidth-1, ease: Power2.easeInOut});
			TweenMax.to(sliderBody.find('>li:eq(0)'), 0, {x: 0, ease: Power2.easeInOut});
			TweenMax.to(sliderBody.find('>li:eq(1)'), 0, {x: sliderWidth + 1, ease: Power2.easeInOut});
			for(var i = 2 ; i < sliderBody.find('>li').length-1 ; i++){
				TweenMax.set(sliderBody.find('>li').eq(i), {x: sliderWidth*2});
			}
			sliderBody.find('>li:eq(0)').addClass('on').find('.vod_dimm').hide();
			// TweenMax.to(sliderBody.find('>li:eq(2)'), 0, {x: sliderWidth, ease: Power2.easeInOut});


			disableBtn();

			bindEvents();

			el.addClass('ui_complete');

			loadImages(0);
			loadImages(1);
			loadImages(-1);

			// TODO: 접근성(1/3, focus)
			return this;
		}

		function bindEvents(){
			btnLeft.on('click', function(e){
				e.preventDefault();

				if(el.find(':animated').length) return;

				moveLeft();
			});

			btnRight.on('click', function(e){
				e.preventDefault();

				if(el.find(':animated').length) return;

				moveRight();
			});
		}

		function moveLeft(){
			// console.log('moveLeft');

			if(currentId > 0){
				--currentId;
			}else{
				currentId = pageSize-1;
			}

			moveSlide('LEFT');
		}

		function moveRight(){
			// console.log('moveRight');

			if(currentId < pageSize-1){
				++currentId;
			}else{
				currentId = 0;
			}

			moveSlide('RIGHT');
		}

		function moveSlide(direction){
			var rollingTime = 0.5;
			var txtDelayTime = 200;
			if($('html').hasClass('ie7') || $('html').hasClass('ie8')){
				rollingTime = 0;
				txtDelayTime = 0;
			}
			if(direction == 'LEFT'){
				// left
				directionVar = 0;
				TweenMax.set(sliderBody.find('>li').eq((pageSize + currentId - 1) % pageSize), {x: -sliderWidth * 2});
				loadImages(currentId-1);
			}else if(direction == 'RIGHT'){
				// right
				directionVar = -1;
				TweenMax.set(sliderBody.find('>li').eq((pageSize + currentId + 1) % pageSize), {x: sliderWidth * 2});
				loadImages(currentId+1);
			}

			for(var i = 0 ; i < 4 ; i++){
				var targetId = (currentId + i - 1 + directionVar)%pageSize;
				var targetX = i - 1 + directionVar;

				if(direction == 'LEFT' && i == 1){
					TweenMax.to(sliderBody.find('>li').eq(targetId), rollingTime, {x: sliderWidth * targetX - 1, ease: Power2.easeInOut});
				}else if(direction == 'RIGHT' && i == 3){
					TweenMax.to(sliderBody.find('>li').eq(targetId), rollingTime, {x: sliderWidth * targetX + 1, ease: Power2.easeInOut});
				}else{
					TweenMax.to(sliderBody.find('>li').eq(targetId), rollingTime, {x: sliderWidth * targetX, ease: Power2.easeInOut});
				}
			}

			sliderBody.find('>li').find('.vod_dimm').fadeIn().eq(currentId).fadeOut();
			setTimeout(function(){
				sliderBody.find('>li').removeClass('on').eq(currentId).addClass('on');
			}, txtDelayTime);


		}

		function loadImages(index){
			sliderBody.find('.ui_slider_item').eq(index).find('img[data-src]').each(function(idx, obj){
				$(this).attr({src: $(this).attr('data-src')}).removeAttr('data-src');
			});
		}

		function disableBtn(){
			if(pageSize <= 1){
				btnLeft.addClass('disabled');
				btnRight.addClass('disabled');
			}else if(currentId <= 0){
				btnLeft.addClass('disabled');
				btnRight.removeClass('disabled');
			}else if(currentId >= pageSize-1){
				btnRight.addClass('disabled');
				btnLeft.removeClass('disabled');
			}else{
				btnLeft.removeClass('disabled');
				btnRight.removeClass('disabled');
			}
		}

		return {
			init: init
			, moveLeft: moveLeft

		};
	}

	$.fn.vodHomeSlider = function() {
		$(this).each(function(idx, obj){
			// console.log(this);
			var sliderInstance = new VodHomeSlider().init(this);
			$(this).data('slider', sliderInstance);
		});
	};

	$.fn.slider = function() {
		var deferred = $.Deferred();

		$(this).each(function(idx, obj){
			if($(this).data('slider')){
				if($(this).data('lazy-load')){
					$(this).data('slider').init();
					return $(this).data('slider');
				}else{
					return $(this).data('slider');
				}
			}else{
				var sliderInstance = new Slider();
				sliderInstance.init(this);

				$(this).data('slider', sliderInstance);
			}
		});

		deferred.resolve('init ok');
		return deferred;
	};

	var uiTab = (function(){
		function init(){
			bindEvents();
		}

		function bindEvents(){
			$(document).on('click', '.ui_tab a', function(e){
				e.preventDefault();

				var index = $(this).closest('li').index();
				$(this).closest('.ui_tab').find('.ui_selected').remove();
				$(this).closest('.ui_tab').find('>li').removeClass('on').eq(index).addClass('on').find('a').append('<span class="hide_txt ui_selected">선택됨</span>');
			});

			$(document).on('click', '.ui_tab_a a', function(e){
				e.preventDefault();

				var index = $(this).index();
				$(this).closest('.ui_tab_a').find('.ui_selected').remove();
				$(this).closest('.ui_tab_a').find('>a').removeClass('on').eq(index).addClass('on').append('<span class="hide_txt ui_selected">선택됨</span>');
			});
		}

		return {
			init: init
		};
	})();

	var globalCommonScript = (function(){
		function init(){
			// 상단 jMnet 보기
			initJMnet();
			// 하다 푸터 더보기
			initFooterViewMore();
			// 프로그램 서브 lnb
			initLnb();

			$('.gnb_search > a').on('click', function(e){
				e.preventDefault();

				var _header = $('#header');
				if(!_header.hasClass('on')){
					_header.addClass('on');

					$('.search_zone input').focus();
				}
			});

			$('.gnb_search a.del').on('click', function(e){
				e.preventDefault();

				var _header = $('#header');
				if(_header.hasClass('on')){
					_header.removeClass('on');
					$('.gnb_search > a').focus();
				}
			});
		}

		function initJMnet(){
			$('.jmnet a').off('click').on('click', function(e){
				e.preventDefault();
				$('.jmnet_zone').slideDown();
				$('.jmnet_zone .jmnet_close').off('click').on('click', function(e){
					e.preventDefault();

					$('.jmnet_zone').slideUp();
					$('.jmnet a').focus();
				});
			});
		}

		function initFooterViewMore(){
			$('#footer .f_more').off('click').on('click', function(e){
				e.preventDefault();

				if($('.f_content').hasClass('open')){
					$('.f_content').removeClass('open');

					$('#footer .f_more').text('더보기');
					$('.f_content .f_second').fadeOut(200);
				}else{
					$('.f_content').addClass('open');
					$('#footer .f_more').text('닫기');
					$('.f_content .f_second').fadeIn(200);

					$('.f_content .f_menu a:eq(0)').focus();
				}
			});
		}

		function initLnb(){
			$('.lnb>li.on .lnb_2depth').show().css({border: 'none'});
			$('.lnb').off('click').on('click', '>li:not(.force_open)>a', function(e){
				var closestLi = $(this).closest('li');

				if(closestLi.find('.lnb_2depth_area').length){
					e.preventDefault();

					if(closestLi.hasClass('on')){
						closestLi.removeClass('on');
						closestLi.filter(':not(.force_open)').find('.lnb_2depth').slideUp();
					}else{
						$('.lnb>li:not(.force_open).on').removeClass('on').find('.lnb_2depth').slideUp();
						closestLi.addClass('on');

						closestLi.find('.lnb_2depth').slideDown();
						closestLi.find('.lnb_2depth').css({border: 'none'});
					}
				}else{

				}
			});
		}

		return {
			init: init
		};
	})();

	var uiFileUploadStyle = function(){
		var el;

		function init(_el){
			el = $(_el);

			bindEvents();

			return this;
		}

		function bindEvents(){
			el.each(function(idx, obj){
				var fileTarget = $(obj).find('.file_hide');

				$(obj).find('.file_txt').off('click').on('click', function(e){
					// e.preventDefault();

					fileTarget.trigger('click');
				});

				fileTarget.off('change').on('change', function(){
					if(window.FileReader){
						var filename = $(this)[0].files[0].name;
					} else {
						var filename = $(this).val().split('/').pop().split('\\').pop();
					}

					$(this).siblings('.file_txt').val(filename);
				});
			});
		}

		return {
			init: init
		};
	}

	var uiPhotoList = function(){
		var el;
		var msnry;

		function init(_el){
			el = $(_el);

			el.hide();
			msnry = new Masonry(el[0], {
				itemSelector: '.photo_item'
				, transitionDuration: '0'
				, stagger: 30
				, columnWidth: 226
			});

			el.imagesLoaded().progress( function() {
				msnry.layout();
				el.fadeIn({complete: function(){
					msnry.options.transitionDuration = '0.2s';
				}});
			});

			return this;
		}

		function append(appendHtml){
			appendHtml = $(appendHtml);
			el.append(appendHtml);
			msnry.appended(appendHtml);

			appendHtml.imagesLoaded().progress( function() {
				msnry.layout();
			});
		}

		return {
			init: init
			, append: append
		};
	}

	var uiMainVisual = function(){
		var el;
		var autoTimer = -1;
		var autoTime = 7000;
		var currentId = 0;
		var length = 0;
		var isPlay = false;
		var btnPlay, btnDot;

		function init(_el){
			el = $(_el);

			length = el.find('.bx_rolling .rolling').length;
			btnDot = el.find('.bx_rolling .ctrl');
			btnPlay = el.find('.ctrl_stop');


			btnPlay.css({left: parseInt(btnDot.css('left')) + btnDot.width() + 4});
			var currentRollingObj = el.find('.bx_rolling > ul').eq(currentId);
			if(currentRollingObj.data('custom-color')){
				el.css({backgroundColor: currentRollingObj.data('custom-color')});
			}

			if(currentRollingObj.data('cover')){
				el.find('.cover').css({background: 'url(' + currentRollingObj.data('cover') + ') center top no-repeat'});
			}

			el.removeClass('drama_color enter_color culture_color news_color sports_color event_color etc_color v_drama_color v_enter_color v_culture_color v_news_color v_sports_color v_etc_color');
			el.addClass(currentRollingObj.data('color'));

			// TweenMax.set(el.find('.tit'), {autoAlpha: 0});
			// TweenMax.set(el.find('.photo'), {autoAlpha: 0});

			bindEvents();

			if(length <= 1){
				btnDot.hide();
				btnPlay.hide();
			}else{
				autoStart();
				isPlay = true;
				btnPlay.show();
			}

			return this;
		}

		function bindEvents(){
			btnDot.on('click', ' > li > a', function(e){
				e.preventDefault();

				var index = $(this).closest('li').index();

				currentId = index;
				showVisual();
				autoStop();
				btnPlay.addClass('play');
				isPlay = false;
			});

			btnPlay.on('click', function(e){
				e.preventDefault();

				if(btnPlay.hasClass('play')){
					btnPlay.removeClass('play');
					autoStart();

					isPlay = true;
				}else{
					btnPlay.addClass('play');
					autoStop();

					isPlay = false;
				}
			});

			el.on('mouseenter', function(e){
				if(isPlay){
					autoStop();
				}
			}).on('mouseleave', function(e){
				if(isPlay){
					autoStart();
				}
			});

			// el.find('a').on('focusin', function(e){
			// 	autoStop();
			// 	el.find('.ctrl_stop').addClass('play');
			// });
		}

		function showVisual(){
			var currentRollingObj = el.find('.bx_rolling > ul').eq(currentId);

			TweenMax.set(currentRollingObj.find('.tit'), {autoAlpha: 0});
			TweenMax.set(currentRollingObj.find('.photo'), {autoAlpha: 0});

			// video는 .cover가 위에 있어야 하며 나머지는 아래있어야 한다(맥 사파리 호환성 때문에 z-index명시 함)
			if(currentRollingObj.data('color').indexOf('v_') == 0){
				TweenMax.set(el.find('.cover'), {autoAlpha: 0, x: 0, zIndex: 2});
			}else{
				TweenMax.set(el.find('.cover'), {autoAlpha: 0, x: 0, zIndex: 0});
			}

			if(currentRollingObj.find('.visual').length){
				TweenMax.set(currentRollingObj.find('.visual'), {autoAlpha: 0, x: 20});
			}else{
				TweenMax.set(currentRollingObj.find('.video_area .btn_play'), {autoAlpha: 0, x: 0});
				TweenMax.set(currentRollingObj.find('.video_area img'), {autoAlpha: 0, x: 20});
			}

			TweenMax.set(currentRollingObj.find('.txt'), {autoAlpha: 0, x: 5, ease: Power2.easeOut});
			el.removeClass('drama_color enter_color culture_color news_color sports_color event_color etc_color v_drama_color v_enter_color v_culture_color v_news_color v_sports_color v_etc_color');
			el.removeAttr('style');
			el.find('.cover').removeAttr('style');
			el.addClass(currentRollingObj.data('color'));
			if(currentRollingObj.data('custom-color')){
				el.css({backgroundColor: currentRollingObj.data('custom-color')});
			}
			if(currentRollingObj.data('cover')){
				el.find('.cover').css({background: 'url(' + currentRollingObj.data('cover') + ') center top no-repeat'});
			}
			if(currentRollingObj.find('.visual').length){
				TweenMax.to(el.find('.cover'), 4, {autoAlpha: 1});
				// TweenMax.to(el.find('.cover'), 20, {x: 0});
			}else{
				TweenMax.to(el.find('.cover'), 1, {autoAlpha: 1});
				// TweenMax.to(el.find('.cover'), 20, {x: 0});
			}
			if(currentRollingObj.find('.visual').length){
				TweenMax.to(currentRollingObj.find('.visual'), 2, {delay: 0.5, autoAlpha: 1, x: 0});
			}else{
				TweenMax.to(currentRollingObj.find('.video_area .btn_play'), 0.5, {delay: 1.5, autoAlpha: 1, x: 0});
				TweenMax.to(currentRollingObj.find('.video_area img'), 2, {delay: 0.5, autoAlpha: 1, x: 0});
			}

			TweenMax.to(currentRollingObj.find('.txt'), 1, {delay: 1, autoAlpha: 1, x: 0, ease: Power2.easeOut});

			TweenMax.to(currentRollingObj.find('.tit:not(.aod)'), 1, {delay: 1.8, autoAlpha: 1, onComplete: function(){
				TweenMax.set(currentRollingObj.find('.photo'), {y: -142, autoAlpha: 1});
				TweenMax.to(currentRollingObj.find('.photo'), 1, {y: 0, ease: Power2.easeOut, onComplete: function(){
					if(currentRollingObj.find('.tit.aod').length > 0){
						TweenMax.set(currentRollingObj.find('.tit.aod'), {x: 142, autoAlpha: 1});
						TweenMax.to(currentRollingObj.find('.tit.aod'), 1, {x: 0, ease: Power2.easeOut});
					}
				}});
			}});

			el.find('.bx_rolling .rolling').hide().eq(currentId).show();
			el.find('.bx_rolling .ctrl li').removeClass('on').eq(currentId).addClass('on');
		}

		function autoStart(){
			clearInterval(autoTimer);
			autoTimer = setInterval(function(){
				if(document.hasFocus()){
					currentId = (currentId+1)%length;
					showVisual();
				}
			}, autoTime);
		}

		function autoPause(){
			clearInterval(autoTimer);
		}

		function autoStop(){
			clearInterval(autoTimer);
		}

		return {
			init: init
		};
	}

	var uiMainOnAir = function(){
		var el;
		var onAirCurrentId = 0;
		var arrAirPosition = [1101, 0, -1101];
		var arrAirPositionIE8 = [0, -1101, -2202];
		var arrAirPositionLength = arrAirPosition.length;

		function init(_el){
			el = $(_el);

			bindEvents();

			disableBtn();

			return this;
		}

		function bindEvents(){
			// 1개
			el.on('click', '.pre', function(e){
				e.preventDefault();

				--onAirCurrentId;
				// if(onAirCurrentId <= 0){
				// 	onAirCurrentId = 0;
				// }
				if(onAirCurrentId <= -1){
					onAirCurrentId = -1;
				}

				disableBtn();

				for(var i = 0 ; i < arrAirPositionLength ; i++){
					if(isIE8){
						if(onAirCurrentId == (i-1)){
							TweenMax.to(el.find('.rolling'), 0.8, {marginLeft: arrAirPositionIE8[i], ease: Power2.easeOut});
						}
					}else{
						if(onAirCurrentId == (i-1)){
							TweenMax.to(el.find('.rolling'), 0.8, {x: arrAirPosition[i], ease: Power2.easeOut});
						}
					}
				}
			});

			el.on('click', '.next', function(e){
				e.preventDefault();

				++onAirCurrentId;
				if(onAirCurrentId >= 1){
					onAirCurrentId = 1;
				}

				disableBtn();

				for(var i = 0 ; i < arrAirPositionLength ; i++){
					if(isIE8){
						if(onAirCurrentId == (i-1)){
							TweenMax.to(el.find('.rolling'), 0.8, {marginLeft: arrAirPositionIE8[i], ease: Power2.easeOut});
						}
					}else{
						if(onAirCurrentId == (i-1)){
							TweenMax.to(el.find('.rolling'), 0.8, {x: arrAirPosition[i], ease: Power2.easeOut});
						}
					}

				}
			});
		}

		function disableBtn(){
			if(onAirCurrentId <= -1){
				el.find('.pre').addClass('disabled');
			}else{
				el.find('.pre').removeClass('disabled');
			}

			if(onAirCurrentId >= 1){
				el.find('.next').addClass('disabled');
			}else{
				el.find('.next').removeClass('disabled');
			}
		}

		return {
			init: init
		};
	}

	var uiRank = function(){
		var el;

		function init(_el){
			el = $(_el);

			el.each(function(idx, obj){
				var $this = $(this);
				var rollWrap = $this.find('.ui_roll_wrap');
				var rollBody = $this.find('.ui_roll_body');
				var rollItem = rollBody.find('>.ui_roll_item');
				var rollHeight = rollWrap.height();
				var rollLength = rollItem.length;
				var btnPrev = $this.find('.ui_btn_prev');
				var btnNext = $this.find('.ui_btn_next');
				var pageSize = rollLength;
				var currentId = 0;

				btnPrev.on('click', function(e){
					e.preventDefault();

					--currentId;
					if(currentId <= 0){
						currentId = 0;
					}

					moveSlide();
				});

				btnNext.on('click', function(e){
					e.preventDefault();

					++currentId;
					if(currentId >= pageSize - 1){
						currentId = pageSize - 1;
					}

					moveSlide();
				});

				function moveSlide(){
					TweenMax.to(rollBody, 0.5, {y: - rollHeight * currentId, ease: Power2.easeInOut});
				}
			});

			return this;
		}

		return {
			init: init
		};
	}

	var uiProgramGNB = function(){
		var el;

		function init(_el){
			el = $(_el);

			refresh();

			bindEvents();

			return this;
		}

		function bindEvents(){
			el.on('mouseenter', function(e){
				e.preventDefault();

				TweenMax.to(el, 0.4, {height: el.data('height')+60, ease: Power2.easeInOut});
			}).on('mouseleave', function(e){
				e.preventDefault();

				TweenMax.to(el, 0.4, {height: 60, ease: Power2.easeInOut});
			});
		}

		function refresh(){
			var maxHeight = 0;
			el.find('dd').height('inherit');

			el.find('dd').each(function(idx, obj){
				// console.log(this, $(this).height());
				maxHeight = Math.max(maxHeight, $(this).height());
			});

			el.find('dd').height(maxHeight);
			el.data('height', el.find('dd').eq(0).outerHeight(true));
		}

		return {
			init: init
			, refresh: refresh
		};
	}

	var uiContentExpand = function(){
		var el, expandTarget;
		var vodDescOriginalHeight;
		var isVodPlayer;

		function init(_el){
			el = $(_el);

			vodDescOriginalHeight = 38;
			isVodPlayer = $('.vod_player_wrap').length ? true : false;

			if(el.find('.desc').height() >= el.find('.desc p').height()){
				el.find('.btn_expand').hide();
				return this;
			}

			bindEvents();

			return this;
		}

		function bindEvents(){
			// console.log(el.find('.desc').height(), el.find('.desc p').height());
			el.on('click', '.btn_expand', function(e){
				e.preventDefault();

				expandTarget = el.find('.desc');


				if($(this).hasClass('on')){
					expandTarget.css({height: expandTarget.data('height')});
					if(isVodPlayer){
						$('.vod_player_wrap').removeAttr('style');
					}
					$(this).removeClass('on');
					$(this).find('.hide_txt').text('펼치기');
				}else{
					expandTarget.data('height', expandTarget.height());
					if(isVodPlayer){
						$('.vod_player_wrap').css({height: $('.vod_player_wrap').height() + $('.desc > p')[0].scrollHeight - vodDescOriginalHeight});
					}
					expandTarget.css({height: 'auto'});
					$(this).addClass('on');
					$(this).find('.hide_txt').text('접기');
				}
			});
		}

		return {
			init: init
		};
	}

	var uiExpandLayer = function(){
		var el, expandLayer, beforeHeight, afterHeight, dataClass, nextObj;

		function init(_el){
			el = $(_el);

			nextObj = el.next('.box_ellipsis');
			nextObj.removeClass('box_ellipsis');

			beforeHeight = nextObj.height();
			dataClass = 'box_ellipsis';
			nextObj.css({textOverflow: 'ellipsis', overflow: 'hidden', width: 640, whiteSpace: 'nowrap', display: 'block'});
			afterHeight = nextObj.height();
			nextObj.addClass(dataClass).removeAttr('style');

			if(beforeHeight <= afterHeight){
				el.hide();
				nextObj.removeClass('box_ellipsis');
			}

			bindEvents();

			return this;
		}

		function bindEvents(){
			el.on('click', function(e){
				e.preventDefault();

				expandLayer = $(this).parent().find('.open_box');

				var $this = $(this);

				if($this.hasClass('btn_close')){
					expandLayer.hide();
					$this.removeClass('btn_close');
					$this.find('.hide_txt').text('펼치기');

					expandLayer.find('.bx_close').off('click');
				}else{


					expandLayer.show();
					$this.addClass('btn_close');
					$this.find('.hide_txt').text('접기');
					expandLayer.find('.bx_close').off('click').on('click', function(e){
						e.preventDefault();

						expandLayer.hide();
						$this.removeClass('btn_close');
						$this.find('.hide_txt').text('펼치기');

						expandLayer.find('.bx_close').off('click');
					});
				}
			});
		}

		return {
			init: init
		};
	}

	var uiSortBox = function(){
		var el;

		function init(_el){
			el = $(_el);

			bindEvents();

			return this;
		}

		function bindEvents(){
			$('body').on('click', function(e){
				var _this = $(e.target).closest('.sort_area').length ? $(e.target).closest('.sort_area') : undefined;

				if(_this === undefined){
					$('body').find('.ui_sort_box > li').removeClass('on');
					return;
				}

				e.preventDefault();

				var index = _this.closest('li').index();
				var sortBoxLi = _this.closest('.ui_sort_box').find('>li');

				if(sortBoxLi.eq(index).hasClass('on')){
					sortBoxLi.removeClass('on').eq(index).removeClass('on');
				}else{
					sortBoxLi.removeClass('on').eq(index).addClass('on');
				}
			});

		}

		return {
			init: init
		};
	}

	var uiBrandMovie = function(){
		var el, frameSrc, frameAlt;
		var playerBrandSong, playerBrandMovie;

		function init(_el){
			el = $(_el);

			initYoubue();
			bindEvents();

			return this;
		}

		function initYoubue(){
			var tag = document.createElement('script');

			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			window.onYouTubeIframeAPIReady = function() {
				playerBrandSong = new YT.Player('brand_song', {
					events: {
						'onStateChange': onPlayerStateChange
					}
				});
				playerBrandMovie = new YT.Player($('#brand_movie iframe')[0], {
					events: {
						'onStateChange': onPlayerStateChange
					}
				});
			}
		}

		function onPlayerStateChange(e){
			if(e.data == YT.PlayerState.PLAYING){
				if(e.target.getIframe().id == 'brand_song'){
					if(playerBrandMovie.getPlayerState() == YT.PlayerState.PLAYING){
						playerBrandMovie.pauseVideo();
					}
				}else{
					if(playerBrandSong.getPlayerState() == YT.PlayerState.PLAYING){
						playerBrandSong.pauseVideo();
					}
				}
			}
		}

		function bindEvents(){
			el.on('click', '.movie_thumb > a', function(e){
				e.preventDefault();

				var index = $(this).index();
				frameSrc = $(this).data('youtube-id');
				frameAlt = $(this).data('frame-alt');

				el.find('.movie_thumb > a').removeClass('on').eq(index).addClass('on');
				el.find('.frame iframe').attr({alt: frameAlt});

				playerBrandMovie.destroy();

				playerBrandMovie = new YT.Player('brand_movie', {
					width: '382',
					height: '217',
					videoId: frameSrc,
					events: {
						'onReady': function(e){
							// e.target.playVideo();
						},
						'onStateChange': onPlayerStateChange
					}
				});
			});

		}

		return {
			init: init
		};
	}

	var uiMagazine = function(){
		var el;

		function init(_el){
			el = $(_el);

			el.each(function(idx, obj){
				var $this = $(this);
				var rollWrap = $this.find('.magazine_roll_wrap');
				var rollBody = $this.find('.magazine_roll_body');
				var rollItem = rollBody.find('>li');
				var rollWidth = rollWrap.width();
				var rollLength = rollItem.length;
				var rollItemWidth = rollItem.eq(0).outerWidth(true);
				var btnPrev = $this.find('.btn_prev_thumb');
				var btnNext = $this.find('.btn_next_thumb');
				var pageSize = Math.ceil(rollLength/6);
				var count = $this.find('.count');
				var currentId = 0;
				rollBody.css({width: rollLength * rollItemWidth});

				count.find('strong').text(1);
				count.find('span:last').text(pageSize);
				btnPrev.on('click', function(e){
					e.preventDefault();

					--currentId;
					if(currentId <= 0){
						currentId = 0;
					}

					moveSlide();
				});

				btnNext.on('click', function(e){
					e.preventDefault();

					++currentId;
					if(currentId >= pageSize - 1){
						currentId = pageSize - 1;
					}

					moveSlide();
				});

				rollBody.on('click', ' > li > a', function(e){
					e.preventDefault();

					var index = $(this).closest('li').index();
					rollItem.removeClass('on').eq(index).addClass('on');
				});

				function moveSlide(){
					count.find('strong').text(currentId+1);
					TweenMax.to(rollBody, 0.5, {x: - rollWidth * currentId - (currentId * 10), ease: Power2.easeInOut});
				}
			});

			return this;
		}

		return {
			init: init
		};
	}

	var uiAccordion = function(){
		var el;

		function init(_el){
			el = $(_el);

			bindEvents();

			return this;
		}

		function bindEvents(){
			el.on('click', '> li > a', function(e){
				e.preventDefault();

				var index = $(this).closest('li').index();

				if($(this).closest('li').hasClass('on')){
					el.find('li').removeClass('on');
				}else{
					el.find('li').removeClass('on').eq(index).addClass('on');
				}
			});
		}

		return {
			init: init
		};
	}

	var uiAccordionTable = function(){
		var el;

		function init(_el){
			el = $(_el);

			bindEvents();

			return this;
		}

		function bindEvents(){
			el.on('click', 'tr:not(.hidden_info)', function(e){
				e.preventDefault();

				if($(e.target).closest('a').length && $(e.target).closest('.title').length){
					return;
				}

				showContent(this);
			});

			el.on('click', '.title a', function(e){
				e.preventDefault();

				showContent(this);
			});
		}

		function showContent(obj){
			var index = $(obj).closest('tr').index();

			if($(obj).closest('tr').hasClass('on')){
				el.find('tr').removeClass('on');
			}else{
				el.find('tr').removeClass('on').eq(index).addClass('on');
			}
		}

		return {
			init: init
		};
	}

	var uiLoading = function(){
		var el;

		function init(_el){
			el = $(_el);

			TweenMax.to(el, 1, {rotation: 360, repeat: -1, ease: Linear.easeNone});

			return this;
		}

		return {
			init: init
		};
	}

	var uiShareMore = function(){
		var el;

		function init(_el){
			el = $(_el);

			bindEvents();

			return this;
		}

		function bindEvents(){
			el.on('click', function(e){
				e.preventDefault();

				var _this = $(this);
				if(_this.next('.ui_btn_share_box').is(':visible')){
					_this.next('.ui_btn_share_box').hide();
				}else{
					_this.next('.ui_btn_share_box').show();
				}

				$('body').on('mousedown.ui_e_share_box', function(e){
					if(!$(e.target).closest('.ui_btn_share_box').length){
						_this.next('.ui_btn_share_box').hide();

						$('body').off('mousedown.ui_e_share_box');
					}
				});
			});
		}

		return {
			init: init
		};
	}

	var uiBtnFileSave = function(){
		var el;

		function init(_el){
			el = $(_el);

			bindEvents();

			return this;
		}

		function bindEvents(){
			el.on('click', function(e){
				e.preventDefault();

				var $this = $(this);
				if($this.next('.filesave_list').is(':visible')){
					$this.next('.filesave_list').hide();
					$this.next('.filesave_list').off('click');
				}else{
					$this.next('.filesave_list').show();
					$this.next('.filesave_list').off('click').on('click', '.bnt_close', function(e){
						e.preventDefault();

						$this.next('.filesave_list').hide();
					});
				}
			});
		}

		return {
			init: init
		};
	}

	var uiVerticalRolling = function(){
		var el;

		function init(_el){
			el = $(_el);
			el.each(function(idx, obj){
				var $this = $(this);
				var rollWrap = $this.find('.ui_vertical_wrap');
				var rollBody = $this.find('.ui_vertical_body');
				var rollItem = rollBody.find('>li');
				var rollHeight = rollWrap.height();

				var rollItemHeight = rollItem.eq(0).height();

				var btnPrev = $this.find('.ui_btn_prev');
				var btnNext = $this.find('.ui_btn_next');
				var btnPlay = $this.find('.ui_btn_play');

				if(rollItem.length <= 1){
					btnPrev.hide();
					btnNext.hide();
					return;
				}

				rollBody.append(rollItem.eq(0).clone());
				rollItem = rollBody.find('>li');

				var rollLength = rollItem.length;
				var pageSize = rollLength;
				var currentId = 0;
				var timer = -1;
				var isPlay = true;


				btnPrev.on('click', function(e){
					e.preventDefault();

					--currentId;
					if(currentId <= 0){
						currentId = 0;
					}

					moveSlide();
				});

				btnNext.on('click', function(e){
					e.preventDefault();

					++currentId;
					if(currentId >= pageSize - 1){
						currentId = pageSize - 1;
					}

					moveSlide();
				});

				btnPlay.on('click', function(e){
					e.preventDefault();

					if(btnPlay.hasClass('btn_play')){
						btnPlay.removeClass('btn_play');
						start();
						isPlay = true;
					}else{
						btnPlay.addClass('btn_play');
						stop();
						isPlay = false;
					}
				});

				function start(){
					stop();
					timer = setInterval(function(){
						if(document.hasFocus()){
							btnNext.trigger('click');
						}
					}, 5000);
				}

				function stop(){
					clearInterval(timer);
				}

				el.on('mouseenter', function(e){
					stop();
				}).on('mouseleave', function(e){
					if(isPlay){
						start();
					}
				});

				el.on('focusin', 'a', function(e){
					rollBody.scrollTop(0);
					stop();
				}).on('focusout', 'a', function(e){
					if(isPlay){
						start();
					}
				});

				start();

				function moveSlide(){
					if(isIE8){
						TweenMax.to(rollBody, 0.5, {marginTop: - rollHeight * currentId, ease: Power2.easeInOut, onComplete: function(){
							if(currentId == pageSize - 1){
								currentId = 0;
								TweenMax.set(rollBody, {marginTop: - rollHeight * currentId});
							}else if(currentId == 0){
								currentId = pageSize - 1;
								TweenMax.set(rollBody, {marginTop: - rollHeight * currentId});
							}
						}});
					}else{
						TweenMax.to(rollBody, 0.5, {y: - rollHeight * currentId, ease: Power2.easeInOut, onComplete: function(){
							if(currentId == pageSize - 1){
								currentId = 0;
								TweenMax.set(rollBody, {y: - rollHeight * currentId});
							}else if(currentId == 0){
								currentId = pageSize - 1;
								TweenMax.set(rollBody, {y: - rollHeight * currentId});
							}
						}});
					}
				}
			});

			return this;
		}

		return {
			init: init
		};
	}

	var uiProgramPoll = function(){
		var el;

		function init(_el){
			el = $(_el);

			initQ1();
			initQ2();
			initQ3();
			initQ4();

			return this;
		}

		function initQ1(){
			var q1Input = el.find('.vote_input_radio');

			q1Input.each(function(idx, obj){

				var _inst = $(this).find(':radio');

				refresh(_inst, $(this), '.radio_select', 'vote_radio_checked');

				_inst.on('change', function(e){
					q1Input.find('.radio_select').removeClass('vote_radio_checked');

					refresh($(this), $(obj), '.radio_select', 'vote_radio_checked');
				});
			});
		}

		function initQ2(){
			var q2Input = el.find('.vote_input_checkbox');

			q2Input.each(function(idx, obj){

				var _inst = $(this).find(':checkbox');

				refresh(_inst, $(this), '.check_select', 'vote_checkbox_checked');

				_inst.on('change', function(e){
					refresh($(this), $(obj), '.check_select', 'vote_checkbox_checked');
				});
			});
		}

		function initQ3(){
			var q2Input = el.find('.vote_input_checkbox2');

			q2Input.each(function(idx, obj){

				var _inst = $(this).find(':checkbox');

				refresh(_inst, $(this), '.check_select2', 'vote_checkbox2_checked');

				_inst.on('change', function(e){
					refresh($(this), $(obj), '.check_select2', 'vote_checkbox2_checked');
				});
			});
		}

		function initQ4(){
			var q2Input = el.find('.vote_input_checkbox3');

			q2Input.each(function(idx, obj){

				var _inst = $(this).find(':checkbox');

				refresh(_inst, $(this), '.check_select3', 'vote_checkbox3_checked');

				_inst.on('change', function(e){
					refresh($(this), $(obj), '.check_select3', 'vote_checkbox3_checked');
				});
			});
		}

		function refresh(obj1, obj2, selector, className){
			if(obj1.is(':checked')){
				obj2.find(selector).addClass(className);
			}else{
				obj2.find(selector).removeClass(className);
			}
		}

		return {
			init: init
		};
	}

	var uiVodPlayer = function(){
		var el, player, vPlayerCon;
		var isWideMode;
		var playerFixedPoint;
		var isPlayerFixed;
		var isClosed, hasVoucher;

		function init(_el){
			el = $(_el);

			vPlayerCon = el.find('.v_player_con');
			player = el.find('.ui_vod_player');
			hasVoucher = player.hasClass('no_voucher');

			isWideMode = $('.vod_player_wrap').hasClass('wide');
			isPlayerFixed = false;
			isClosed = false;
			playerFixedPoint = player.offset().top + player.height() + 100;

			bindEvents();

			return this;
		}

		function bindEvents(){
			vPlayerCon.prepend('<div id="testBtn" style="display:none;position:absolute;right:0;top:0;width:60px;height:50px;background:#f00;z-index:999">극장모드</div>');

			$('#testBtn').on('click', function(e){
				if($('.vod_player_wrap').hasClass('wide')){
					$('.vod_player_wrap').removeClass('wide');
				}else{
					$('.vod_player_wrap').addClass('wide');
				}
			});

			if(hasVoucher){
				return;
			}

			player.find('.sm_player_lose').on('click', function(e){
				e.preventDefault();

				isClosed = true;
				player.addClass('anim').removeClass('play_fixed');
				setTimeout(function(){
					player.removeClass('anim');
				}, 300);
				isPlayerFixed = false;
			});

			$(window).on('scroll', function(e){
				isWideMode = $('.vod_player_wrap').hasClass('wide');
				if(isWideMode || isClosed) return;	// 와이드 모드이거나 fixed모드를 한번 끈 상태면 다시 나타나지 않음 (네이버 티비캐스트와 동일)

				if(!isPlayerFixed && playerFixedPoint <= $(window).scrollTop()){
					player.addClass('play_fixed');
					isPlayerFixed = true;
				}else if(isPlayerFixed && playerFixedPoint > $(window).scrollTop()){
					player.addClass('anim').removeClass('play_fixed');
					setTimeout(function(){
						player.removeClass('anim');
					}, 300);
					isPlayerFixed = false;
				}
			});

		}

		return {
			init: init
		};
	}

	var uiReplayInfoAccordion = function(){
		var el, el_selector;

		function init(_el, _el_selector){
			el_selector = _el_selector;
			el = $(_el);

			$('#content').data('uiReplayInfoAccordion', this);

			bindEvents();

			return this;
		}

		function bindEvents(){
			el = $(el_selector);
			el.find('.btn_free').off('click').on('click', function(e){
				e.preventDefault();

				var index = $(this).closest('.repaly_list').index('.repaly_list');

				if($(this).closest('.repaly_list').hasClass('open')){
					el.find('.repaly_list').removeClass('open');
					el.find('.btn_free').removeClass('on').html('무료영상클립보기<em></em>');
				}else{
					el.find('.repaly_list').removeClass('open').eq(index).addClass('open');
					el.find('.btn_free').removeClass('on').html('무료영상클립보기<em></em>');
					el.find('.btn_free').eq(index).addClass('on').html('무료영상클립닫기<em></em>');
					$(this).closest('.repaly_list').find('.ui_slider').slider();
				}
			});
		}

		function refresh(){
			$('.ui_slider').slider();

			bindEvents();
		}

		return {
			init: init
			, refresh: refresh
		};
	}

	var uiTabRelation = function(){
		var el, btnLeft, btnRight, rollingWrap, rollingBody, rollingItem, rollingSize, rollingWrapWidth, rollingBodyWidth;
		var currentId = 0, maxScrollX, leftDimm, rightDimm;

		function init(_el){
			el = $(_el);

			btnLeft = el.find('.btn_prev');
			btnRight = el.find('.btn_next');
			rollingWrap = el.find('.rolling_relation');
			rollingBody = rollingWrap.find('>ul');
			rollingItem = rollingBody.find('>li');
			leftDimm = el.find('.l_dimm');
			rightDimm = el.find('.w_dimm');

			leftDimm.hide();
			rightDimm.hide();

			rollingSize = rollingItem.length;
			rollingWrapWidth = rollingWrap.width();
			rollingBodyWidth = 0;
			rollingBody.css({width: 9999});
			rollingBodyWidth = Math.round($('.rolling_relation li').eq(-1).position().left + $('.rolling_relation li').eq(-1).width());

			rollingBody.css({width: rollingBodyWidth});

			maxScrollX = rollingBodyWidth - rollingWrapWidth;

			if(maxScrollX < 0){
				maxScrollX = 0;

				btnLeft.hide();
				btnRight.hide();

				leftDimm.hide();
				rightDimm.hide();

				rollingBody.css({margin: '0 auto'});
			}else{
				rightDimm.show();

				btnLeft.show();
				btnRight.show();

				if(rollingItem.filter('.on').length){
					var index = rollingItem.filter('.on').index();
					currentId = index;
				}

				moveSlide(0);

				bindEvents();
			}

			rollingWrap.css({opacity: 1});

			return this;
		}

		function bindEvents(){
			btnLeft.on('click', function(e){
				e.preventDefault();

				if(currentId > 0){
					--currentId;
				}else{
					currentId = 0;
				}
				moveSlide();
			});

			btnRight.on('click', function(e){
				e.preventDefault();


				if(currentId < rollingSize-1){
					++currentId;
				}else{
					currentId = rollingSize-1;
				}
				moveSlide();
			});
		}

		function getLiWidth(index){
			var width = 0;
			for(var i = 0 ; i < index ; i++){
				width += rollingItem.eq(i).outerWidth();
			}

			return width;
		}

		function moveSlide(_speed){
			if(_speed === 0){
				_speed = _speed;
			}else{
				_speed = 0.5;
			}

			rollingItem.removeClass('current').eq(currentId).addClass('current');
			var targetX = 0;

			if(currentId > 0){
				targetX = getLiWidth(currentId) - 20;
				leftDimm.show();
			}else{
				leftDimm.hide();
				rightDimm.show();
			}

			if(maxScrollX > targetX){
				rightDimm.show();
				moveSlideAction(_speed, targetX);
			}else{
				--currentId;
				rightDimm.hide();
				moveSlideAction(_speed, maxScrollX);
			}
		}

		function moveSlideAction(_speed, target){
			if(isIE8){
				TweenMax.to(rollingBody, _speed, {marginLeft: -target, ease: Power2.easeInOut});
			}else{
				TweenMax.to(rollingBody, _speed, {x: -target, ease: Power2.easeInOut});
			}
		}

		function refresh(){
			bindEvents();
		}

		return {
			init: init
			, refresh: refresh
		};
	}

	var uiBrowserupgrade = function(){
		var el;

		function init(_el){
			el = $(_el);

			if(!Cookies.get('main_browserupgrade_close')){
				el.show();
			}
			bindEvents();

			return this;
		}

		function bindEvents(){
			el.find('.browser_close').on('click', function(e){
				e.preventDefault();

				$('.browserupgrade').slideUp();
				Cookies.set('main_browserupgrade_close', 1);
			});
		}

		return {
			init: init
		};
	}

	var uiDateSchedule = function(){
		var el;

		function init(_el){
			el = $(_el);

			el.each(function(idx, obj){
				var $this = $(this);
				var rollWrap = $this.find('.ui_vertical_wrap');
				var rollBody = $this.find('.ui_vertical_body');
				var rollItem = rollBody.find('>.date');
				var rollHeight = rollWrap.height();

				var rollItemHeight = rollItem.eq(0).height();

				var btnPrev = $this.find('.ui_btn_prev');
				var btnNext = $this.find('.ui_btn_next');
				var btnPlay = $this.find('.ui_btn_play');

				var isSchedule = $this.hasClass('date_zone');

				var airTimeList = $this.find('.bx_airtime_wrap > .bx_airtime');

				var rollLength = rollItem.length;
				var pageSize = rollLength;
				var currentId = 0;
				var timer = -1;
				var isPlay = true;

				moveSlide();


				btnPrev.on('click', function(e){
					e.preventDefault();

					--currentId;
					if(currentId < 0){
						currentId = 0;
						return;
					}
					if(currentId <= 0){
						currentId = 0;
					}

					disableBtn();

					moveSlide();
				});

				btnNext.on('click', function(e){
					e.preventDefault();

					++currentId;
					if(currentId > pageSize - 1){
						currentId = pageSize - 1;
						return;
					}
					if(currentId >= pageSize - 1){
						currentId = pageSize - 1;
					}
					disableBtn();

					moveSlide();
				});

				function moveSlide(){
					TweenMax.to(rollBody, 0.4, {y: -rollHeight * currentId, ease: Power2.easeInOut});

					showAirTimeList(currentId);
				}

				function showAirTimeList(index){
					hideAirTimeListItem();
					airTimeList.hide();
					TweenMax.set(airTimeList, {display: 'none', opacity: 0});
					TweenMax.to(airTimeList.eq(index), 0.5, {display: 'table', opacity: 1});

					var btnTxtMore = airTimeList.eq(index).find('.btn_txt_more');
					if(btnTxtMore.length){
						btnTxtMore.off('click').on('click', function(e){
							e.preventDefault();

							var _this = $(this);
							if(_this.hasClass('on')){
								_this.find('.hide_txt').text('펼쳐보기');
								_this.removeClass('on');
								hideAirTimeListItem();
								$('.bx_preview').removeClass('multiple');
							}else{
								_this.find('.hide_txt').text('접기');
								_this.addClass('on');
								showAirTimeListItem(_this.closest('.bx_airtime').find('.time_list'));
								$('.bx_preview').addClass('multiple');
							}
						});
					}
				}

				function disableBtn(){
					if(currentId <= 0){
						btnPrev.addClass('disabled');
					}else{
						btnPrev.removeClass('disabled');
					}

					if(currentId >= pageSize - 1){
						btnNext.addClass('disabled');
					}else{
						btnNext.removeClass('disabled');
					}
				}

				function hideAirTimeListItem(){
					var _o;
					airTimeList.each(function(i, o){
						_o = $(o);
						_o.find('li').hide().eq(0).show().eq(1).show();
						_o.find('li').eq(1).show();

						if(_o.find('li').length > 2 && !_o.find('.btn_txt_more').length){
							_o.append('<a href="#" class="btn_txt_more"><span class="hide_txt">펼쳐보기</span><em class="ico_arrow"></em></a>');
						}else if(_o.find('.btn_txt_more').length){
							_o.find('.btn_txt_more').removeClass('on');
						}
					});
				}

				function showAirTimeListItem(_obj){
					_obj.find('li').show();
				}
			});

			return this;
		}

		return {
			init: init
		};
	}

	var uiDirectClick = function(){
		var el;

		function init(_el){
			el = $(_el);

			el.on('touchstart mouseenter focus', 'a', function(e) {
				if(e.type == 'touchstart' || (isIOS && e.type == 'mouseenter')) {
					e.stopImmediatePropagation();
					e.preventDefault();

					location.href = $(this).attr('href');
				}
			});

			return this;
		}

		return {
			init: init
		};
	}


}(jQuery);

