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
import MyReviews from './components/ReviewProfile/MyReviews';
import OwnerReview from './components/OwnerReview/OwnerReview';
import Charts from './components/Charts/Charts';
import MyComplains from './components/MyComplains/MyComplains';
import OwnerComplain from './components/OwnerComplain/OwnerComplain';
import RenterReservation from './components/RenterReservation/RenterReservation';
import OwnerBookings from './components/OwnerBookings/OwnerBookings';
import AllUsers from './components/AllUsers/AllUsers';
import AllComplains from './components/AllComplains/AllComplains';
import Payments from './components/Transactions/Transactions';

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
      // owner routes
      {
        path: '/dashboard/profile',
        element: <UserProfile></UserProfile>
      },
      {
        path: '/dashboard/listingOwner',
        element: <HouseListing></HouseListing>
      },
      {
        path: '/dashboard/ownerReview',
        element: <OwnerReview></OwnerReview>
      },
      {
        path: '/dashboard/earning',
        element: <Charts></Charts>
      },
      {
        path: '/dashboard/ownerComplain',
        element: <OwnerComplain></OwnerComplain>
      },
      {
        path: '/dashboard/ownerBookings',
        element: <OwnerBookings></OwnerBookings>
      },
      // renter routes
      {
        path: '/dashboard/myReviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: '/dashboard/myComplains',
        element: <MyComplains></MyComplains>
      },
      {
        path: '/dashboard/mySchedules',
        element: <RenterReservation></RenterReservation>
      },
      {
        path: '/dashboard/myPayments',
        element: <Payments></Payments>
      },
      //admin routes
      {
        path: '/dashboard/manageListing',
        element: <ManageListing></ManageListing>
      },
      {
        path: '/dashboard/allUsers',
        element: <AllUsers></AllUsers>
      },
      {
        path: '/dashboard/allComplains',
        element: <AllComplains></AllComplains>
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
