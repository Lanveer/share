﻿<?php
use yii\helpers\Html;
use yii\helpers\Url;

?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>简购大转盘</title>

    <style type="text/css">
        body,
        ul,
        ol,
        li,
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        form,
        fieldset,
        table,
        td,
        img,
        div {
            margin: 0;
            padding: 0;
            border: 0;
        }

        body {
            color: #333;
            font-size: 12px;
            font-family: "Microsoft YaHei"
        }

        ul,
        ol {
            list-style-type: none;
        }

        select,
        input,
        img,
        select {
            vertical-align: middle;
        }

        input {
            font-size: 12px;
        }

        a {
            text-decoration: none;
            color: #000;
        }

        a:hover {
            color: #c00;
            text-decoration: none;
        }

        .clear {
            clear: both;
        }

        /* 大转盘样式 */

        .banner {
            display: block;
            width: 95%;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
        }

        .banner .turnplate {
            display: block;
            width: 100%;
            position: relative;
        }

        .banner .turnplate canvas.item {
            width: 100%;
        }

        .banner .turnplate img.pointer {
            position: absolute;
            width: 36%;
            height: 40%;
            left: 32%;
            top: 28%;
        }

        .more {
            display: block;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            height: 150px;
        }

        .cloud {
            position: fixed;
            left: 0;
            top: 70%;
            width: 150px;
        }

        .cloud2 {
            position: fixed;
            right: 0;
            top: 32%;
            width: 50px;
        }

        .cloud3 {
            position: fixed;
            left: 0;
            top: 30%;
            width: 100px;
        }

        @media screen and (max-width: 320px) {
            .cloud {
                position: fixed;
                left: 0;
                top: 70%;
                width: 150px;
            }

            .cloud2 {
                position: fixed;
                right: 0;
                top: 30%;
                width: 50px;
            }

            .cloud3 {
                position: fixed;
                left: 0;
                top: 23%;
                width: 100px;
            }
        }

        @media screen and (min-width: 321px) and (max-width: 375px) {
            .cloud {
                position: fixed;
                left: 0;
                top: 72%;
                width: 150px;
            }

            .cloud2 {
                position: fixed;
                right: 0;
                top: 32%;
                width: 50px;
            }

            .cloud3 {
                position: fixed;
                left: 0;
                top: 25%;
                width: 100px;
            }
        }

        @media screen and (min-width: 376px) {
            .cloud {
                position: fixed;
                left: 0;
                top: 68%;
                width: 150px;
            }

            .cloud2 {
                position: fixed;
                right: 0;
                top: 32%;
                width: 50px;
            }

            .cloud3 {
                position: fixed;
                left: 0;
                top: 25%;
                width: 100px;
            }
        }

        @media screen and (max-height: 480px) {
            .cloud {
                position: fixed;
                left: 0;
                top: 81%;
                width: 150px;
            }

            .cloud2 {
                position: fixed;
                right: 0;
                top: 35%;
                width: 50px;
            }

            .cloud3 {
                position: fixed;
                left: 0;
                top: 27%;
                width: 100px;
            }
        }

        #mark {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 0;
            left: 0;
            display: none;
        }

        .red-img {
            position: fixed;
            top: 10%;
            left: 5%;
            width: 90%;
        }
    </style>

    <script type="text/javascript" src="/assets/dial/js/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="/assets/dial/js/awardRotate.js"></script>

    <script type="text/javascript">

        // 这里设置API接口
        var api = {
            // 获取配置数据接口
            getData:'/index.php?r=game/game/content&auth_name=id&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&shop_game_id=<?=$shop_game_id?>',
            // 抽奖接口
            tapped:'/index.php?r=game/game/outline&auth_name=id&id=1&tx=3f556f66353c5945a3633ae209a3e0ff&shop_game_id=<?=$shop_game_id?>'
        };

        var turnplate = {
            restaraunts: [], //大转盘奖品名称
            colors: [], //大转盘奖品区块对应背景颜色
            outsideRadius: 192, //大转盘外圆的半径
            textRadius: 155, //大转盘奖品位置距离圆心的距离
            insideRadius: 68, //大转盘内圆的半径
            startAngle: 0, //开始角度

            bRotate: false //false:停止;ture:旋转
        };


        $(document).ready(function () {

            //动态添加大转盘的奖品与奖品区域背景颜色

            // 这里请求数据
            $.ajax({
                url: api.getData,
                type: 'POST',
                dataType: 'json',
                success: function (res) {
                    var data = {
                        restaraunts:res,
                        colors: ["#FFFFFF", "#5fcbd5", "#FFFFFF", "#5fcbd5", "#FFFFFF", "#5fcbd5", "#FFFFFF", "#5fcbd5"],
                    };
                    init(data);
                },
                error: function () {
                    alert('服务器或本地网络有问题');
                },
                complete: function () {
                    // 这里模拟请求成功，设置好API请注释这里
//                    var data = {
//                        restaraunts:["呵呵","嘿嘿","哈哈","得到"],
////                        restaraunts: ["碧根果一袋", "年货红包", "水果拼盘300元月卡", "2元现金红包", "夏威夷果一袋", "3元现金红包", "松子一袋 ", "5元现金红包"],
//                        colors: ["#FFFFFF", "#5fcbd5", "#FFFFFF", "#5fcbd5", "#FFFFFF", "#5fcbd5", "#FFFFFF", "#5fcbd5"],
//                    };
//                    init(data);
                }
            });

            // 初始化
            var init = function (data) {
                turnplate.restaraunts = data.restaraunts;
                turnplate.colors = data.colors;

                // 渲染页面
                drawRouletteWheel();
            };

            var rotateTimeOut = function () {
                $('#wheelcanvas').rotate({
                    angle: 0,
                    animateTo: 2160,
                    duration: 8000,
                    callback: function () {
                        alert('网络超时，请检查您的网络设置！');
                    }
                });
            };

            // 根据返回数据来旋转转盘
            var rotateFn = function (data) {

                var angles = data.item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));
                if (angles < 270) {
                    angles = 270 - angles;
                } else {
                    angles = 360 - angles + 270;
                }
                $('#wheelcanvas').stopRotate();
                $('#wheelcanvas').rotate({
                    angle: 0,
                    animateTo: angles + 1800,
                    duration: 8000,
                    callback: function () { //回调
                    }
                });
            };

            $('.pointer').click(function () {
                if (turnplate.bRotate) return;
//                turnplate.bRotate = !turnplate.bRotate;

                // 这里请求服务器数据来抽奖
                $.ajax({
                    url: api.tapped,
                    type: 'POST',
                    dataType: 'json',
                    success: function (res) {
                        item = res;
                    },
                    error: function () {
                    },
                    complete: function () {
                        console.log(item);
                        // 这里模拟请求成功，设置好API请注释这里
                        var data = {item:item, msg: '恭喜中奖啦!~'};
                        rotateFn(data);
                    }
                });

                //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]

                /* switch (item) {
                 case 1:
                 rotateFn(252, turnplate.restaraunts[0]);
                 break;
                 case 2:
                 rotateFn(216, turnplate.restaraunts[1]);
                 break;
                 case 3:
                 rotateFn(180, turnplate.restaraunts[2]);
                 break;
                 case 4:
                 rotateFn(144, turnplate.restaraunts[3]);
                 break;
                 case 5:
                 rotateFn(108, turnplate.restaraunts[4]);
                 break;
                 case 6:
                 rotateFn(72, turnplate.restaraunts[5]);
                 break;
                 case 7:
                 rotateFn(36, turnplate.restaraunts[6]);
                 break;
                 case 8:
                 rotateFn(360, turnplate.restaraunts[7]);
                 break;
                 case 9:
                 rotateFn(324, turnplate.restaraunts[8]);
                 break;
                 case 10:
                 rotateFn(288, turnplate.restaraunts[9]);
                 break;
                 } */

            });
        });

        function rnd(n, m) {
            var random = Math.floor(Math.random() * (m - n + 1) + n);
            return random;

        }

        function drawRouletteWheel() {
            var canvas = document.getElementById("wheelcanvas");
            if (canvas.getContext) {
                //根据奖品个数计算圆周角度
                var arc = Math.PI / (turnplate.restaraunts.length / 2);
                var ctx = canvas.getContext("2d");
                //在给定矩形内清空一个矩形
                ctx.clearRect(0, 0, 422, 422);
                //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                ctx.strokeStyle = "#FFBE04";
                //font 属性设置或返回画布上文本内容的当前字体属性
                ctx.font = 'bold 18px Microsoft YaHei';
                for (var i = 0; i < turnplate.restaraunts.length; i++) {
                    var angle = turnplate.startAngle + i * arc;
                    ctx.fillStyle = turnplate.colors[i];
                    ctx.beginPath();
                    //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                    ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
                    ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
                    ctx.stroke();
                    ctx.fill();
                    //锁画布(为了保存之前的画布状态)
                    ctx.save();

                    //改变画布文字颜色
                    var b = i + 2;
                    if (b % 2) {
                        ctx.fillStyle = "#FFFFFF";
                    } else {
                        ctx.fillStyle = "#E5302F";
                    }
                    ;

                    //----绘制奖品开始----


                    var text = turnplate.restaraunts[i];
                    var line_height = 17;
                    //translate方法重新映射画布上的 (0,0) 位置
                    ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

                    //rotate方法旋转当前的绘图
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);

                    /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                    if (text.indexOf("盘") > 0) { //判断字符进行换行
                        var texts = text.split("盘");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : 'bold 18px Microsoft YaHei';
                            if (j == 0) {
                                ctx.fillText(texts[j] + "盘", -ctx.measureText(texts[j] + "盘").width / 2, j * line_height);
                            } else {
                                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height * 1.2); //调整行间距
                            }
                        }
                    } else if (text.indexOf("盘") == -1 && text.length > 8) { //奖品名称长度超过一定范围
                        text = text.substring(0, 8) + "||" + text.substring(8);
                        var texts = text.split("||");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                        }
                    } else {

                        //在画布上绘制填色的文本。文本的默认颜色是黑色

                        //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                    }

                    //把当前画布返回（调整）到上一个save()状态之前
                    ctx.restore();
                    //----绘制奖品结束----
                }
            }
        }
        ;
    </script>
</head>

<body style="background:url(/assets/dial/images/body_bg.jpg);background-size:cover;">
<div class="banner" style="margin-top: 35%">
    <div class="turnplate" style="background-image:url(/assets/dial/images/cj_bg.png);background-size:100% 100%;">
        <canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
        <img class="pointer" src="/assets/dial/images/jt2.png"/>
    </div>
</div>
<a href="#" class="more"></a>
<img src="/assets/dial/images/9.png" class="cloud">
<img src="/assets/dial/images/10.png" class="cloud2">
<img src="/assets/dial/images/11.png" class="cloud3">

<div style="text-align:center;margin:50px 0; font:normal 14px/24px 'MicroSoft YaHei';">

</div>
</body>

</html>