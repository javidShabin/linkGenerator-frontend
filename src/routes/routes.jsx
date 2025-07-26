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


export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,

    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "signup-page",
        element: <SignupForm />
      },
      {
        path: "login-page",
        element: <LoginForm />
      },
      
      {
        path: "user",
        element: <AuthUser />,

        children: [
          {
            path: "link-generating",
            element: <LinkGenerator />
          },
          {
            path: "qr-generator/:slug",
            element: <QrGenerator />
          },
          {
            path: "check-out",
            element: <ProPlanPage />
          },
          {
            path: "payment-success",
            element: <PaymentSuccess />
          }
          
        ]
      }
    ]
  },
]);
