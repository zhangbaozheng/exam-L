import React, { Component } from 'react';
import RouterView from '@/router/RouteView';

interface IRoute {
  path?: string
  component?: any
  redirect?: string
  isLogin?: boolean
  children?: IRoute[]
  name: string
}
interface Props {
  routes: IRoute[]
}
interface State {
 
}

export default class Grade extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>
        <RouterView routes={this.props.routes}></RouterView>
      </div>
    )
  }
}
