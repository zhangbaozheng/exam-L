import React, { Suspense } from 'react';
import { routes } from '@/router/index'
import RouterView from '@/router/RouteView'
import { BrowserRouter } from 'react-router-dom'
import Loading from '@/components/Loading'

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <RouterView routes={routes}></RouterView>
      </BrowserRouter>
    </Suspense>

  );
}

export default App;
