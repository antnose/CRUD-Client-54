import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import UserDetails from "./components/UserDetails.jsx";
import UpdateUser from "./components/UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users/:id",
    loader: ({ params }) => fetch(`http://localhost:3001/users/${params.id}`),
    element: <UserDetails />,
  },
  {
    path: "/update/:id",
    loader: ({ params }) => fetch(`http://localhost:3001/users/${params.id}`),
    Component: UpdateUser,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
