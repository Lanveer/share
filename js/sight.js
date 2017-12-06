/**
 * Created by Administrator on 2017/9/27.
 */

//详情url
var detailUrl= baseUrl+'newtravel/travel/details';

//评论列表
var commentUrl=baseUrl+'newtravel/travel/comments';

    url = window.location.href;
    str =url;
    re = getQueryString(str);

    // var data={
    //     travel_id:re.travel_id,
    //     user_id:re.user_id,
    //     type:1,
    //     auth_name:re.auth_name,
    //     tx:re.tx
    // };

var data={
    travel_id:49,
    user_id:1397,
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
        $('.pinglun').hide();
        $('.w-header').show();
        $('.w-footer').show();
    }else{
        // 在其他浏览器中
    }
})();

var app=angular.module('myApp',['ngSanitize']);
app.controller('sightCtrl',function ($scope,$http) {
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


//评论

app.controller('commentCtr',function ($scope,$http) {
   var  commentPromise=$http({
       method:'get',
       url:commentUrl,
       type:'json',
       params:data
   });
   commentPromise.success(function (data,status) {
       var commentList=data.data;
       var commentLength=commentList.length;
       console.log(data);

       if(commentLength>=2){
           $scope.commentList=commentList.slice(0,3);
           $scope.flag=1;
       }else if(commentLength<1){
           $scope.flag=0;
       }else if(commentLength==1){
           $scope.commentList=commentList;
       }
   })
});