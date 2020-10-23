/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 赵舒婷
 * @Date: 2020-10-23 09:55:58
 * @LastEditors: 赵舒婷
 * @LastEditTime: 2020-10-23 14:22:31
 */

let bgImg ='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603371967325&di=b40c105faf1f808d343499f47cdfe1b3&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201107%2F18%2F1128552dfogdk5efkhzmoh.jpg' ;
let lines = [
    {
        coords: [
             [697, 751],
            [255, 556]
        ],
    },
    {
        coords: [
             [697, 751],
            [296, 304]
        ]
    },
    {
        coords: [
             [697, 751],
            [525, 462]
        ],
    },
    {
        coords: [
             [697, 751],
            [700, 290]
        ],
    },
    {
        coords: [
            [697, 751],
            [784, 560]
        ]
    },
]
export default {
    backgroundColor: '#000',
    grid:{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 1460,
        height: 1194
    },
    xAxis: {
        show: false,
        min: 0,
        max: 1000,
        position: 'top',
        axisPointer: {
            show: true
        }
    },
    yAxis: {
        show: false,
        min: 0,
        max: 1000,
        axisPointer: {
            show: true
        }
    },
    
    // 线条动画
    series: [
        {
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            zlevel: 1,
            // 动画效果
            effect: {
                show: true,
                period: 3, //特效动画的时间，单位为 s
                trailLength:0.5, //特效尾迹的长度。0~1数值越大尾迹越长
                color: '#64f2ff',
                	symbol: 'arrow', //箭头图标
					symbolSize: 10, //图标大小
            },
            
            lineStyle: {
                normal: {
                    color: '#00FEFF',
                    width: 0,
                    curveness:-0.24
                }
            },
            data: lines
        }
    ],

    // // 图片
    graphic: [
        {
            type: 'image',
            position: [0, 0],
            style: {
                image: bgImg,
            }
        },
    ]
}