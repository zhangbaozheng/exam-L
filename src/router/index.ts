import Home from '@/views/Home'
import Addtest from '@/views/home-children/Addtest';
import Classify from '@/views/home-children/Classify';
import Examine from '@/views/home-children/Examine';
import Login from '@/views/Login';
import Detail from "@/views/home-children/Detail"
const routes = [
    {
        path: '/',
        name:'/',
        redirect: '/index'
    },
    {
        path: '/index',
        name:'index',
        component: Home,
        children:[

            {
                path:'/index/addtest',
                name:'添加试题',
                component:Addtest,
                flag:true
              
            },
            {
                path:'/index/classify',
                name:'试题分类',
                component:Classify,
                flag:true
            },
            {
                path:'/index/examine',
                name:'查看试题',
                component:Examine,
                flag:true
            },
            {
                path:'/index/detail/:id',
                name:'试题详情',
                component:Detail,
                flag:false
            }
           
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login,
    },
 
]

export default routes;

