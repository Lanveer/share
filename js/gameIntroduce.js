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
var detailUrl= baseUrl+'game/game/introducecontent';
var data={
    auth_name:re.auth_name,
    tx:re.tx,
    shop_game_id:re.shop_game_id
}

// var data={
//     shop_game_id:7,
//     auth_name:'name',
//     name:1,
//     tx:'3f556f66353c5945a3633ae209a3e0ff'
// }

var app= angular.module('myApp',[]);
app.controller('gameCtrl',function ($scope,$http) {
    $scope.url='../game/preview.php?shopGameId='+data.food_id+'';
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