
var codeTag;

$('.et--component-code').find('pre').length > 0 ? codeTag = 'pre' : codeTag = 'xmp'

// copy code
$('body').prepend('<textarea id="component-copy-area"></textarea>');

$('.btn-copy').on('click', function(e){
    e.preventDefault();
    var $componentCopyArea = $('#component-copy-area');
    var copyText = $(this).closest('.et--component-code').find(codeTag).text();

    $componentCopyArea.val(copyText).select();
    document.execCommand('copy');
    $componentCopyArea.val('');

    // toast popup
    var $toastCopty =  $(this).next('.toast-copy');
    $('.toast-copy').removeClass('on');
    $toastCopty.addClass('on');
    setTimeout(function(){
        $toastCopty.removeClass('on');
    }, 3000);
});

// expand code
$('.et--component-code').each(function(index, object){
    if ($(object).find(codeTag).outerHeight() > 200) {
        $(object).find('.options').prepend('<button class="btn-expand" type="button"><span></span></button>')
    }

    var trimCode;

    // trim pre code
    if (codeTag === 'pre') {
        trimCode = $(object).find(codeTag).text().trim();
    }
    // trim xmp code
    else {
        trimCode = $(object).find(codeTag).text().replace(/                    /gi, "").trim();
    }

    $(object).find(codeTag).text(trimCode);

});

$('.btn-expand').on('click', function(){
    var codeBox = $(this).closest('.et--component-code');

    if (codeBox.hasClass('expand')) {
        codeBox.removeClass('expand');
    }
    else {
        codeBox.addClass('expand');
    }
});

// component menu toggle
var $componentWrap = $('.et--component-wrap');

$('.btn-toggle').on('click', function (){
    if ( $componentWrap.hasClass('open') ) {
        $componentWrap.removeClass('open');
    }
    else {
        $componentWrap.addClass('open');
    }
})


// component active menu
function getPageName(url){
    var pageName = "";

    var strPageName = url.split("/");
    pageName = strPageName[strPageName.length-1].split("?")[0];

    return pageName;
}

$('.et--component-menu-list li').each(function(index, object){
    var menuUrl = $(object).find('a').attr('href');

    if (getPageName(menuUrl) === getPageName(window.location.href)) {
        $(object).addClass('on');
        $(object).find('a').attr('href', 'javascript:vold(0)');
    }
})
