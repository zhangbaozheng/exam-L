import React from 'react';
import routes from '@/router/index'
import RouterView from '@/router/RouteView'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <RouterView routes={routes}></RouterView>
    </BrowserRouter>
  );
}

export default App;
