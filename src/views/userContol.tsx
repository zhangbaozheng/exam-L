import React, { Component } from "react";
import RouterView from "@/router/RouteView";
interface Props {
  routes: IRoute[];
}
interface State {}
interface IRoute {
  path?: any;
  component?: any;
  redirect?: string;
  isLogin?: boolean;
  children?: IRoute[];
  name: string;
}
export default class userContol extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <RouterView routes={this.props.routes}></RouterView>
      </div>
    );
  }
}
