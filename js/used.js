/**
 * Created by Administrator on 2017/9/27.
 */

//详情url
var detailUrl= baseUrl+'magor/five/details';
//想要列表
var wantUrl=baseUrl+'magor/five/wantlist';
//评论列表
var commentUrl=baseUrl+'magor/five/comments';

url = window.location.href;
str =url;
re = getQueryString(str);

var data={
    id:re.id,
    grand_id:1,
    user_id:re.user_id,
    info_id:re.id,
    tx:re.tx,
    auth_name:re.auth_name,
};

// var data={
//     id:105743,
//     grand_id:1,
//     user_id:1402,
//     auth_name:'name',
//     name:1,
//     tx:'3f556f66353c5945a3633ae209a3e0ff'
// };

// 判断下载设备
$('#footer,#header').click(function(){
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
        $('#footer').hide();
        $('.pinglun').hide();
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

var app=angular.module('myApp',[]);
app.controller('myCtrl',function ($scope,$http) {
   var promise =$http({
       method:'get',
       url:detailUrl,
       type:'json',
       params:data
   });
    promise.success(function (data,status) {
        console.log(data)
        if(status && status==200){
            var msg=data.data;
            var want= msg.thumbs.slice(0,3);
            var merchat= msg.merchant;
            $scope.wantLength=msg.thumbs.length;
            var wantLength=msg.thumbs.length;
            if(wantLength>2){
                $scope.want=want;
            }else{
                $scope.wants=msg.thumbs
            }

            $scope.msg=msg;
            $scope.imgs=msg.images;
            $scope.prefixed='800_600.jpg';
            $scope.icon_prefixed='200_200.jpg';
            $scope.merchat=merchat;
        }
    });
    promise.error(function (data,ststus) {
        console.log('获取信息失败')
    });



});

//评论模块
app.controller('commentCtrl',function ($scope,$http) {
    //获取想要列表
    var commentPromise=$http({
        method:'get',
        url:commentUrl,
        type:'json',
        params:data
    });
    commentPromise.success(function (data,status) {
        if(status && status==200){
            var lists=data.data;
            console.log(lists)
            $scope.commentLength= lists.length;
            var commentLength=lists.length;
            if(commentLength!=0){
                $scope.flag=1;
                $scope.commentList=lists;
            }
            if(commentLength>=3){
                var lists=data.data.slice(0,3);
                $scope.commentList=lists;
            }else if(commentLength<1){
                $scope.flag=0;
            }
        }
    })
});