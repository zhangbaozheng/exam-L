/*
 * @Author: your name
 * @Date: 2020-10-19 18:59:55
 * @LastEditTime: 2020-10-19 19:59:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exam-L\src\router\index.ts
 */
import Home from "@/views/Home";
import Login from "@/views/Login";
import UserContol from '../views/userContol'
import UserAdd from "../views/userControl/userAdd"
import UserShow from "../views/userControl/userShow"
const routes = [
  {
    path: "/",
    redirect: "/index",
    name: "/",
  },
  {
    path: "/index",
    name: "index",
    component: Home,
    children: [
      {
        path:'/index/usercontol',
        component:UserContol,
        name: "用户管理",
        children: [
          {
            path:'/index/usercontol/useradd',
            name: "添加用户",
            component:UserAdd
          },
          {
            path:'/index/usercontol/usershow',
            name: "用户展示",
            component:UserShow
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

export default routes;


let nav = [
    {
        name: '试题管理',
        children: [
            {
                name: '添加试题'
            },
            {
                name: '试题分类'
            },
            {
                name: '查看试题'
            }
        ]
    },
    {
        name: '用户管理',
        children: [
            {
                name: '添加用户'
            },
            {
                name: '用户展示'
            }
        ]
    },
    {
        name: '考试管理',
        children: [
            {
                name: '添加考试'
            },
            {
                name: '试卷列表'
            }
        ]
    },
    {
        name: '班级管理',
        children: [
            {
                name: '班级管理'
            },
            {
                name: '教室管理'
            },
            {
                name: '学生管理'
            }
        ]
    },
    {
        name: '阅卷管理',
        children: [
            {
                name: '待批班级'
            }
        ]
    },
]
