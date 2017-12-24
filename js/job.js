/**
 * Created by Administrator on 2017/9/28.
 */

//详情url
var detailUrl= baseUrl+'magor/five/details';

//评论列表
var commentUrl=baseUrl+'magor/five/comments';

url = window.location.href;
str =url;
re = getQueryString(str);

var data={
    id:re.id,
    grand_id:3,
    user_id:re.user_id,
    auth_name:re.auth_name,
    tx:re.tx
};

// var data={
//     id:7213,
//     grand_id:3,
//     user_id:1403,
//     auth_name:'name',
//     name:1,
//     tx:'3f556f66353c5945a3633ae209a3e0ff'
// };

// 判断下载设备
$('#header,#footer').click(function(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        console.log('ios')
        window.location.href=downLoadUrl;
        // window.location.href='https://jglist.onelink.me/1789171185';
    } else if (/android/.test(ua)) {
        console.log('android')
        window.location.href=downLoadUrl;
        // window.location.href='https://jglist.onelink.me/1789171185';
    }
});

//判断显示那一部分
(function checkDevice() {
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        //在微信中
        $('#header').hide();
        $('.pinglun').hide();
        $('#footer').hide();
        $('.w-header').show();
        $('.w-footer').show();
    }else if( ua.match(/WeiBo/i) == "weibo"){
        $('#header').hide();
        $('#footer').hide();
        $('.pinglun').hide();
        $('.w-header').show();
        $('.w-footer').show();
    }
})();

var app=angular.module('myApp',['ngSanitize']);
app.controller('jobCtrl',function ($scope,$http) {
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
            $scope.merchat=msg.merchant;
            $scope.prefixed='800_600.jpg';
            $scope.icon_prefixed='200_200.jpg';
        }
    });
    promise.error(function (data,ststus) {
        console.log('获取信息失败')
    });



});


//评论

app.controller('commentCtrl',function ($scope,$http) {
    var wantPromise=$http({
        method:'get',
        url:commentUrl,
        type:'json',
        params:data
    });
    wantPromise.success(function (data,status) {
        if(status && status==200){
            var lists=data.data;
            var commentLength=lists.length;
            if(commentLength!=0){
                $scope.flag=1;
                $scope.commentList=lists;
                $scope.commentLength=lists[0].total_count;
            }
            if(commentLength>3){
                var lists=data.data.slice(0,3);
                $scope.commentList=lists;
            }else if(commentLength<1){
                $scope.flag=0;
                $scope.commentLength=0
            }
        }
    })
});
