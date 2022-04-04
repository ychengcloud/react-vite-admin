import React, { ReactNode, Suspense, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import axios, { AxiosContext } from './api/request';
import NotFoundPage from './pages/404';
import './index.css';
import App from './App';
import { ErrorBoundary } from 'react-error-boundary';
import SuspendFallbackLoading from './pages/layout/suspendFallbackLoading';
import { message, notification } from 'antd';
import { Provider } from 'react-redux';
import store from './stores';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  },
});

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => {
    return axios;
  }, []);

  return (
    <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
  );
};

ReactDOM.render(
  // <React.StrictMode>
  <AxiosProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <>
              <div>
                There was an error!
                <button onClick={() => resetErrorBoundary()}>Try again</button>
                <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
              </div>
            </>
          )}
        >
          <Suspense fallback={<SuspendFallbackLoading />}>
            <App />
          </Suspense>
        </ErrorBoundary>
      </Provider>
    </QueryClientProvider>
  </AxiosProvider>,
  // {/* </React.StrictMode> */}，
  document.getElementById('root')
);
