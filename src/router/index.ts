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

const routes = [
    {
        path: '/',
        redirect: '/index',
        name: '/'
    },
    {
        path: '/index',
        name: 'index',
        component: Home,
        children: [
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
