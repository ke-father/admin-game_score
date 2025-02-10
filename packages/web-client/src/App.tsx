import React, { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import RouterGuard from './components/RouterGuard';
import PageLoading from './components/PageLoading';
import { routes } from './routes';

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

const App: React.FC = () => {
  return (
    <Router>
      <RouterGuard>
        <Suspense fallback={<PageLoading />}>
          <AppRoutes />
        </Suspense>
      </RouterGuard>
    </Router>
  );
};

export default App;
