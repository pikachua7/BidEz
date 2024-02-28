import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./LandingPage";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { ProjectDetails } from "./components/ProjectDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
        path: "/project-details/:projectId",
        element: <ProjectDetails />,
      },
    ],
    errorElement: <></>,
  },
]);
