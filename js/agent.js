/**
 * Created by Administrator on 2017/9/28.
 */
/**
 * Created by Administrator on 2017/9/28.
 */



//详情url
var detailUrl= baseUrl+'user/shop/seller';
url = window.location.href;
str =url;
re = getQueryString(str);

var data={
    user_id:re.user_id,
    auth_name:re.auth_name,
    tx:re.tx
};

// var data={
//     user_id:1397,
//     auth_name:'name',
//     name:1,
//     tx:'3f556f66353c5945a3633ae209a3e0ff'
// }

// 判断下载设备
$('#header').click(function(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        console.log('ios')
        window.location.href=downLoadUrl;
    } else if (/android/.test(ua)) {
        console.log('android')
        window.location.href=downLoadUrl;
    }
});

//判断显示那一部分
(function checkDevice() {
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        //在微信中
        $('#header').hide();
        $('.w-header').show();
        $('.w-footer').show();
    }else{
        // 在其他浏览器中
    }
})();


var app=angular.module('myApp',[]);
app.controller('agentCtrl',function ($scope,$http) {
    var promise =$http({
        method:'get',
        url:detailUrl,
        type:'json',
        params:data
    });
    promise.success(function (data,status){
        if(status && status==200){
            var msg=data.data;
            console.log(msg);
            $scope.msg=msg;
            $scope.prefixed='800_600.jpg';
            $scope.icon_prefixed='200_200.jpg';
        }
    });
    promise.error(function (data,ststus) {
        console.log('获取信息失败')
    });
});


