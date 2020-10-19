import Home from '@/views/Home'

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: Home
    }
]

export default routes;

