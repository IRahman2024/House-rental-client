import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import HomePage from './components/Home/HomePage';
import Duplex from './components/Home/Rooms/Duplex';
import Suite from './components/Home/Rooms/Suite';
import Simple from './components/Home/Rooms/Simple';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/Dashboard/Profile/UserProfile';
import DashboardLayout2 from './components/layout/DashboardLayout2';
import DashboardLayout from './components/layout/DashboardLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:
      [
        {
          path: '/',
          element: <HomePage></HomePage>
        },
        {
          path: '/duplex',
          element: <Duplex></Duplex>
        },
        {
          path: '/suit',
          element: <Suite></Suite>
        },
        {
          path: '/simple',
          element: <Simple></Simple>
        },
      ]
  },
  {
    path: '/dashboard',
    // element: <Dashboard></Dashboard>,
    element: < DashboardLayout2 />,
    // element: < DashboardLayout />,
    children: [
      {
        path: '/dashboard/profile',
        element: <UserProfile></UserProfile>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
