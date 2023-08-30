import { Navigate, createBrowserRouter } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import Dashboard from "../pages/dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Content from "../pages/articles/Content";
import Preferences from "../pages/user/Preferences";
import ArticleList from "../pages/articles/ArticleList";

const isUserAuthenticated = localStorage.getItem("authToken") !== null;

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/articles/:id",
    element: <Content />,
  },
  {
    path: "/sport/:id",
    element: <ArticleList />,
  },
  {
    path: "/account",
    children: [
      { index: true, element: <Navigate to="/account/dashboard" replace /> },
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
