/**
 * Created by lanveer on 2017/9/25.
 */

//测试服务器
var baseUrl='http://106.14.56.22:9529/index.php?r='
//正式服务器
// var baseUrl='http://54.161.25.252/index.php?r=';

//下载地址
var downLoadUrl='https://jglist.onelink.me/1789171185?pid=shareH5';


function getQueryString(str){
    var ret = {};
    var query = str ? str.substr(str.indexOf('?')) : window.location.search.substr(1);
    query.replace(/(\w+)=(\w+)/ig, function(a, b, c, d,f){
//      console.log(arguments);
        ret[b] = unescape(c);
    });
    return ret;
}
url = window.location.href;
str =url;
re = getQueryString(str);

/*浏览器的判断*/

(function checkDevice() {
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        $(".situation-b").show();
        $(".situation-a").hide();
    }else{
        $(".situation-b").hide()
    }
})()

// 判断下载设备
$('').click(function(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        window.location.href='https://jglist.onelink.me/1789171185';
    } else if (/android/.test(ua)) {
        window.location.href='https://jglist.onelink.me/1789171185';
    }
})
