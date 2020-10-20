import Home from "@/views/Home";
import Login from "@/views/Login";
//考试管理
import Sexam from "@/views/s-exam/exam";
import Sadd from "@/views/s-exam/exam/Add";
import Slist from "@/views/s-exam/exam/List";
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
        name: "123",
      },
      {
        path: "/index/s-exam",
        name: "考试管理",
        component: Sexam,
        children: [
          {
            path: "/index/s-exam/s-add",
            name: "添加考试",
            component: Sadd,
          },
          {
            path: "/index/s-exam/s-list",
            name: "试卷列表",
            component: Slist,
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
