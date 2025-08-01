import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Home";
import SignupForm from "../pages/Signup";
import LoginForm from "../pages/Login";
import LinkGenerator from "../pages/auth/Link";
import AuthUser from "./protuct/AuthUser";
import QrGenerator from "../pages/pro/QrGenerator";
import ProPlanPage from "../pages/auth/checkOut";
import PaymentSuccess from "../pages/auth/paymentSuccess";
import PaymentCancel from "../pages/auth/paymentCancel";
import ProUser from "./protuct/ProUser";
import DashboardLayout from "../layout/DashboardLayout";
import ProfilePage from "../pages/auth/profile";
import MyLinks from "../pages/auth/MyLinks";
import Dashbord from "../pages/auth/Dashbord";
import BrandPage from "../pages/pro/BrandPage";
import EditProfile from "../pages/auth/EditProfile";
import BlockedPage from "../pages/BlockedPage";
import ForgotPassword from "../pages/FogotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signup-page",
        element: <SignupForm />,
      },
      {
        path: "login-page",
        element: <LoginForm />,
      },
      {
        path: "/:userId",
        element: <BrandPage />,
      },
      {
        path: "account-blocked",
        element : <BlockedPage />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },

      // ***************************************************************************
      // ************************* Auth (Loggined) user routes setup**************************
      {
        path: "user",
        element: <AuthUser />,

        children: [
          {
            path: "link-generating",
            element: <LinkGenerator />,
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
          // **************************************************************************
          // ******************** User dashbord routes setup***************************

          {
            path: "dashboard",
            element: <DashboardLayout />,

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
                path: "my-links",
                element: <MyLinks />,
              },
              {
                path: "settings/edit-profile",
                element: <EditProfile />
              }
            ],
          },
        ],
      },

      // *******************************************************************************
      // *********************** Premium user routes setup******************************
      {
        path: "pro-user",
        element: <ProUser />,

        children: [
          {
            path: "qr-generator/:slug",
            element: <QrGenerator />,
          },
        ],
      },
      
    ],
  },
]);
