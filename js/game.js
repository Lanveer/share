/**
 * Created by Administrator on 2017/9/27.
 */

// 判断下载设备
$('.btn').click(function(){
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        console.log('ios')
        window.location.href=downLoadUrl;
        // window.location.href='https://jglist.onelink.me/1789171185 ';
    } else if (/android/.test(ua)) {
        console.log('android')
        window.location.href=downLoadUrl;
        // window.location.href='https://jglist.onelink.me/1789171185';
    }
});

//详情url
var detailUrl= baseUrl+'game/game/introducecontent';
//tokenUrl
var tokenUrl= baseUrl+'newprivilege/privilege/token';

var addUrl=baseUrl+'newprivilege/privilege/add';

url = window.location.href;
str =url;
re = getQueryString(str);

var data={
    shop_game_id:re.shop_game_id,
    auth_name:re.auth_name,
    tx:re.tx
}


var app= angular.module('myApp',[]);
app.controller('gameCtrl',function ($scope,$http) {
    $scope.shopGameId=data.food_id;
    var gameUrl='https://time2.jglist.com/html.php?r=game/game/preview&shop_game_id='+data.food_id+'';
    var frame='';
    frame+="<iframe style='height: 400px;' src='"+gameUrl+"'  frameborder='0'></iframe>"
    $('.game-box').append(frame);
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

    //获取到tocken
    var promise=$http({
        method:'get',
        url:tokenUrl,
        type:'text',
        params:data
    });
    promise.success(function (data,status,config,headers) {
        if(status && status==200){
            token=data;
        }
        var data={
            token:token
        };
        var promiseAdd=$http({
            method:'get',
            url:addUrl,
            type:'text',
            params:data
        });
        promiseAdd.success(function (data,status,config,headers) {
            if(status && status==200){
                console.log(data);
                console.log('数据计入成功')
            }
        });
        promiseAdd.error(function (data,status,hedaers,config) {
            console.log('数据计入失败')
        })
    });

    promise.error(function(data,status,hedaers,config){
        console.log('获取token出错')
    });



})
