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

