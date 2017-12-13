/**
 * Created by Administrator on 2017/9/27.
 */

// 判断下载设备
$('.btn').click(function(){
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

//详情url
var detailUrl= baseUrl+'game/game/shopgame';

var data={
    // food_id:re.food_id,
    auth_name:re.auth_name,
    tx:re.tx,
    food_id:re.privilege_id
}

var app= angular.module('myApp',[]);
app.controller('gameCtrl',function ($scope,$http) {
    var gameDetail=$http({
        method:'get',
        url:detailUrl,
        type:'json',
        params:data
    });
    gameDetail.success(function (data,status) {
        console.log(data);
        var msg=data.data;
        if(status && status===200){
            $scope.msg=msg
        }
    });
    gameDetail.error(function (data,status) {
        console.log('获取游戏信息出错')
    })
})