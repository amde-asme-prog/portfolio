import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./common/ErrorBoundary.jsx";
import Portfolio from "./portfolio/Portfolio.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Portfolio />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: 1,
              staleTime: 1000 * 60 * 5,
              cacheTime: 1000 * 60 * 60,
            },
            mutations: {
              retry: 1,
              staleTime: 1000 * 60 * 5,
              cacheTime: 1000 * 60 * 60,
            },
          },
        })
      }
    >
      <ErrorBoundary>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
export default App;
