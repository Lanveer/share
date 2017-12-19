/**
 * Created by Administrator on 2017/9/28.
 */
//详情url
var detailUrl= baseUrl+'circle/circle/detail';

//评论列表
var commentUrl=baseUrl+'circle/circle/commentslist';
url = window.location.href;
str =url;
re = getQueryString(str);
// var data={
//     user_id:re.user_id,
//     circle_id:re.circle_id,
//     auth_name:re.auth_name,
//     tx:re.tx
// };


var data={
    circle_id:2736,
    user_id:1385,
    auth_name:'name',
    name:1,
    tx:'3f556f66353c5945a3633ae209a3e0ff'
};

// 判断下载设备
$('#header,.download-tips').click(function(){
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
        $('.pinglun').hide()
        $('.w-header').show();
        $('.w-footer').show();
    }else{
        // 在其他浏览器中
    }
})();

var app=angular.module('myApp',[]);
app.controller('circleCtrl',function ($scope,$http) {
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


app.controller('commentCtrl',function ($scope,$http) {
    var  commentPromise=$http({
        method:'get',
        url:commentUrl,
        type:'json',
        params:data
    });
    commentPromise.success(function (data,status) {
        var commentList=data.data;
        var commentLength=commentList.length;
        $scope.commentLength=commentLength;
        console.log(commentList);
        if(commentLength!=0){
            $scope.flag=1;
            $scope.commentList=commentList;
        }else{
            $scope.flag=0;
        }
        if(commentLength>=3){
            $scope.commentList=commentList.slice(0,3);
            $scope.flag=1;
        }else if(commentLength<1){
            $scope.flag=0;
        }else if(commentLength==1){
            $scope.commentList=commentList;
        }
    })

});
