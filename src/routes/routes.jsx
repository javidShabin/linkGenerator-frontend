import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import ErrorPage from "../components/error/ErrorPage";
import LoginForm from "../pages/LoginPage";
import SignupForm from "../pages/SignupPage";
import BlockedPage from "../pages/BlockedPage";
import AuthUser from "./protect/AuthUser";
import LinkGenerating from "../pages/auth/LinkGenerating";
import QRGenerator from "../pages/proUser/QRGenerator";
import UserDashbord from "../layouts/UserDashbord";
import Dashbord from "../pages/auth/Dashbord";
import ProfilePage from "../pages/auth/ProfilePage";
import ProUser from "./protect/ProUser";
import ProPlanPage from "../pages/auth/PaymentPlans";
import PaymentSuccess from "../pages/auth/PaymentSuccess";
import PaymentCancel from "../pages/auth/PaymentCancel";
import MyLinks from "../pages/auth/MyLinks";
import ProfileEdite from "../pages/auth/ProfileEdite";
import ForgotPassword from "../components/ForgotPassword";
import BrandPage from "../pages/BrandPage";
import AdminDashboard from "../layouts/AdminDashboard";
import AdminProfilePage from "../pages/auth/admin/AdminProfile";
import AllUsers from "../pages/auth/admin/AllUsers";
import Plans from "../pages/auth/admin/Plans";
import AddPackagePage from "../components/auth/AddPackage";
import ProUsers from "../pages/auth/admin/ProUsers";
import PaymentDetails from "../pages/auth/admin/PaymentDetails";
import AdminProfileEdit from "../pages/auth/admin/ProfileEdit";
import AdminsDashboard from "../pages/auth/admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    // **********************************************************************
    // *************** Normal user route************************************
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login-page",
        element: <LoginForm />,
      },
      {
        path: "signup-page",
        element: <SignupForm />,
      },
      {
        path: "account-blocked",
        element: <BlockedPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/:id",
        element: <BrandPage />
      },

      // ************************************************************
      // ************* Authenticated user routes *****************************
      {
        path: "user",
        element: <AuthUser />,

        children: [
          {
            path: "link-generate",
            element: <LinkGenerating />,
          },
          {
            path: "check-out",
            element: <ProPlanPage />,
          },
          {
            path: "payment-success",
            element: <PaymentSuccess />,
          },
          {
            path: "payment-cancel",
            element: <PaymentCancel />,
          },

          // **********************************************************************
          // ******************** User dashborad routes***************************

          {
            path: "dashbord",
            element: <UserDashbord />,

            children: [
              {
                index: true,
                element: <Dashbord />,
              },
              {
                path: "profile",
                element: <ProfilePage />,
              },
              {
                path: "prev-liks",
                element: <MyLinks />,
              },
              {
                path: "edit-profile",
                element: <ProfileEdite />,
              },
            ],
          },

          {
            path: "admin",
            element: <AdminDashboard />,

            children: [
              {
                index: true,
                element: <AdminsDashboard />
              },
              {
                path: "profile",
                element: <AdminProfilePage />
              },
              {
                path: "all-users",
                element: <AllUsers />
              },
              {
                path: "payment-plans",
                element: <Plans />
              },
              {
                path: "add-plans",
                element: <AddPackagePage />
              },
              {
                path: "pro-users",
                element: <ProUsers />
              },
              {
                path: "payment-details",
                element: <PaymentDetails />,
              },
              {
                path: "edit-profile",
                element: <AdminProfileEdit />,
              },
            ]
          }
        ],
      },

      // ******************************************************************
      // ********************** Premium user routes ********************************

      {
        path: "pro-user",
        element: <ProUser />,

        children: [
          {
            path: "qr-generator/:slug",
            element: <QRGenerator />,
          },
        ],
      },
    ],
  },
]);
