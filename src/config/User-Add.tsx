import React from "react";
import UserIdAdd from "@/components/ControllerUser/User-IdAdd";
import UserApiAdd from "@/components/ControllerUser/User-ApiAdd";
import UserAddView from "@/components/ControllerUser/User-AddView";
import UserApiSet from "@/components/ControllerUser/User-ApiSet";
import UserIdView from "@/components/ControllerUser/User-IdView";
const AddUserConfig = [
    {
        tab: "身份",
        type: "card",
        com: <UserIdAdd></UserIdAdd>,
      },
      {
        tab: "添加api权限",
        type: "card",
        com: <UserApiAdd></UserApiAdd>,
      },
      {
        tab: "添加视图接口权限",
        type: "card",
        com: <UserAddView></UserAddView>,
      },
      {
        tab: "给身份设置api接口权限",
        type: "card",
        com: <UserApiSet></UserApiSet>,
      },
      {
        tab: "给身份设置视图权限",
        type: "card",
        com: <UserIdView></UserIdView>,
      },
]
export default AddUserConfig