/**
 * Created by Administrator on 2017/9/26.
 */
var tokenUrl= baseUrl+'newprivilege/privilege/token';
var addUrl=baseUrl+'newprivilege/privilege/add';
var detailUrl= baseUrl+'merchant/shop/privilegedetail';
    url = window.location.href;
    str =url;
    re = getQueryString(str);

var data={
    pid:re.pid,
    food_id:re.food_id,
    auth_name:re.auth_name,
    tx:re.tx
};

// var data={
//     pid:12,
//     food_id:12,
//     auth_name:'name',
//     name:1,
//     tx:'3f556f66353c5945a3633ae209a3e0ff'
// };


var detailData={
    privilege_id:re.privilege_id,
    user_id:re.user_id,
    auth_name:re.auth_name,
    tx:re.tx
};


// 判断下载设备
$('.add,#header>img').click(function(){
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
        $('.add').hide();
        $('#header').hide();
        $('.w-header').show();
        $('.w-footer').show();
    }else{
       // 在其他浏览器中
    }
})();


var app= angular.module('myApp',[]);
app.controller('myCtrl',function ($scope,$http) {
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
                  console.log(token)
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

   var detailPromise=$http({
       method:'get',
       url:detailUrl,
       type:'json',
       params:detailData
   });
    detailPromise.success(function (data,status) {
        if(status &&status==200){
            var msg=data.data;
            $scope.msg=data.data;
            $scope.images=msg.image;
            $scope.prefixed='800_600.jpg';
            $scope.icon_prefixed='200_200.jpg';
            console.log(msg)
        }
    });

    detailPromise.error(function (data,status) {
        console.log('获取数据详情失败')
    })

    });

//微信控制器
// app.controller('w-myCtrl',function ($scope,$http) {
//
//     var detailPromise=$http({
//         method:'get',
//         url:detailUrl,
//         type:'json',
//         params:detailData
//     });
//     detailPromise.success(function (data,status) {
//         if(status &&status==200){
//             var msg=data.data;
//             $scope.msg=data.data;
//             $scope.images=msg.image
//             console.log(msg)
//         }
//     });
//
//     detailPromise.error(function (data,status) {
//         console.log('获取数据详情失败')
//     })
// });
//
