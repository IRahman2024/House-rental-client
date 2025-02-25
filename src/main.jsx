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
import Simple from './components/Home/Rooms/Apartment';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/Dashboard/Profile/UserProfile';
import DashboardLayout2 from './components/layout/DashboardLayout2';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import AuthProvider from './providers/AuthProvider';
import HouseListing from './components/DashCompos/Owner/HouseListing/HouseListing';
import PrivateRoutes from './routes/privateRoutes';
import ManageListing from './components/ManageListing/manageListing';
import Details from './Shared/DetailedRoom/Details';

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
          path: '/apartment',
          element: <Simple></Simple>
        },
        {
          path: '/details/:houseId/:ownerId',
          loader: ({params}) => fetch(`http://localhost:3000/houseDetail/${params.houseId}/${params?.ownerId}`),
          element: <Details></Details>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
      ]
  },
  {
    path: '/dashboard',
    // element: <Dashboard></Dashboard>,
    element: <PrivateRoutes>< DashboardLayout2 /></PrivateRoutes>,
    // element: < DashboardLayout />,
    children: [
      {
        path: '/dashboard/profile',
        element: <UserProfile></UserProfile>
      },
      {
        path: '/dashboard/listingOwner',
        element: <HouseListing></HouseListing>
      },
      //admin routes
      {
        path: '/dashboard/manageListing',
        element: <ManageListing></ManageListing>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>,
)
