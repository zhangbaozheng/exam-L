<<<<<<< HEAD
<<<<<<< HEAD
/*
 * @Description: 
 * @Author: 王寒烟
 * @Date: 2020-10-19 19:03:13
 * @LastEditTime: 2020-10-19 19:57:24
 * @LastEditors: 王寒烟
 * @FilePath: \exam-L\src\router\index.ts
 */
import Home from '@/views/Home'
import Login from '@/views/Login'
import Grade from '@/views/grade/Grade'
import List from '@/views/grade/List'
import Room from '@/views/grade/Room'
import Student from '@/views/grade/Student'
=======
import Home from '@/views/Home'
import Login from '@/views/Login'
>>>>>>> 290c56ec3b09146271dbb539823444cc5a937bd6

=======
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
>>>>>>> 09824f02e7d8d22157f5fbe09876f9fd6a2e4e8a
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
<<<<<<< HEAD
            {
<<<<<<< HEAD
                path: '/index/grade',
                name:'班级管理',
                component:Grade,
                redirect:'/index/grade/list',
                children:[
                    {
                        path: '/index/grade/list',
                        name: '班级管理',
                        component: List,
                    },
                    {
                        path: '/index/grade/room',
                        name: '教室管理',
                        component: Room,
                    },
                    {
                        path: '/index/grade/student',
                        name: '学生管理',
                        component: Student,
                    }
                ]
=======
                name: '123'
>>>>>>> 290c56ec3b09146271dbb539823444cc5a937bd6
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]
=======
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
>>>>>>> 09824f02e7d8d22157f5fbe09876f9fd6a2e4e8a

export default routes;

<<<<<<< HEAD
=======

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
>>>>>>> 290c56ec3b09146271dbb539823444cc5a937bd6
