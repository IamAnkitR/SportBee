import { Navigate, createBrowserRouter } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import Dashboard from "../pages/dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Preferences from "../pages/user/Preferences";
import ArticleList from "../pages/articles/ArticleList";
import Notfound from "../NotFound";
import Home from "../pages/Home";
import Settings from "../pages/user/Settings";

const isUserAuthenticated = localStorage.getItem("authToken") !== null;

const router = createBrowserRouter([
  {
    path: "/",
    element: isUserAuthenticated ? (
      <Navigate to="/account/dashboard" replace />
    ) : (
      <Home />
    ),
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: isUserAuthenticated ? (
      <Navigate to="/account/dashboard" replace />
    ) : (
      <Dashboard />
    ),
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/sport/:id",
    element: <ArticleList />,
  },
  {
    path: "/notfound",
    element: <Notfound />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/account",
    children: [
      { index: true, element: <Navigate to="/account/dashboard" replace /> },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "preferences",
            element: (
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
