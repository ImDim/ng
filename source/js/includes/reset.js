function detectmob() {
    
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}

function NameBro() {
    var ua = navigator.userAgent;

    if (ua.search(/MSIE/) != -1) return 'ie';
    if (ua.search(/Firefox/) != -1) return 'firefox';
    if (ua.search(/Opera/) != -1) return 'opera';
    if (ua.search(/Chrome/) != -1) return 'chrome';
    if (ua.search(/Safari/) != -1) return 'safari';
    if (ua.search(/Konqueror/) != -1) return 'konqueror';
    if (ua.search(/Iceweasel/) != -1) return 'debian';
    if (ua.search(/SeaMonkey/) != -1) return 'monkey';

    // Браузеров очень много, все вписывать смысле нет, Gecko почти везде встречается
    if (ua.search(/Gecko/) != -1) return 'Gecko';

    // а может это вообще поисковый робот
    return "unknow";
}

var bro = NameBro();

//Убираем слэш
function _slash(a) {
    return a.replace(/[/]?(.*?)[/]*$/, "$1");
}

//Ставим адресс
function _push( page ) {


    var nowPage = decodeURI( _slash(window.location.pathname.toString()) );
    var page = _slash( page );

    if( nowPage == page ) {

        return;
    }


    if( bro != "ie" ) { window.history.pushState({page: page, type: "page"}, document.title, '/'+page); } else { window.location.hash = page; }


}