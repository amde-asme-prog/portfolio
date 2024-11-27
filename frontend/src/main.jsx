import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./fonts.css";

import Dashboard from "./dashboard/Dashboard.jsx";
import Login from "./dashboard/components/Login.jsx";
import Register from "./dashboard/components/Register";
import Portfolio from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Portfolio />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={new QueryClient()}>
    <StrictMode>
      <RouterProvider router={routes} />
    </StrictMode>
  </QueryClientProvider>
);
