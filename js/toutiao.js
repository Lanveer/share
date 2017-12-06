/**
 * Created by Administrator on 2017/9/27.
 */

//详情url
var detailUrl= baseUrl+'circle/headline/newsdetail';
//想要列表
var wantUrl=baseUrl+'magor/five/wantlist';

//评论列表
var commentUrl=baseUrl+'circle/headline/commentslist';

url = window.location.href;
str =url;
re = getQueryString(str);

var data={
    user_id:re.user_id,
    headline_id:re.headline_id,
    device_id:re.device_id,
    auth_name:re.auth_name,
    tx:re.tx
};

// var data={
//     headline_id:93720,
//     user_id:1397,
//     auth_name:'name',
//     name:1,
//     tx:'3f556f66353c5945a3633ae209a3e0ff'
// };


// 判断下载设备
$('#header,.download-tips').click(function(){
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
        $('.pinglun').hide();
        $('.w-header').show();
        $('.w-footer').show();
    }else{
        // 在其他浏览器中
    }
})();

var app=angular.module('myApp',['ngSanitize']);
app.controller('myCtrl',function ($scope,$http) {
    var promise =$http({
        method:'get',
        url:detailUrl,
        type:'json',
        params:data
    });
    promise.success(function (data,status) {
        if(status && status==200){
            var msg=data.data;
            var want=msg.praised_imgs;
            var wantLength= want.length;
            $scope.wantLength=wantLength;

            if(wantLength>2){
                $scope.want=want;
            }else{
                $scope.wants=msg.praised_imgs;
            }
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


//评论模块
app.controller('commentCtr',function ($scope,$http) {
    //获取想要列表
    var wantPromise=$http({
        method:'get',
        url:commentUrl,
        type:'json',
        params:data
    });
    wantPromise.success(function (data,status) {
        if(status && status==200){
            console.log(data)
            var lists=data.data;
            $scope.commentLength= lists.length;
            var commentLength=lists.length;
            if(commentLength!=0){
                $scope.flag=1;
                $scope.commentList=lists;
            }
            if(commentLength>3){
                var lists=data.data.slice(0,3);
                $scope.commentList=lists;
                $scope.flag=1;
            }else if(commentLength<1){
                $scope.flag=0;
            }

        }
    })
});
