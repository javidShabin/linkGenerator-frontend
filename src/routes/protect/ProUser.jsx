import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../configs/axiosInstance";
import { Outlet, useNavigate } from "react-router-dom";

const ProUser = () => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Prevents state updates after unmount

    const checkProUser = async () => {
      try {
        const response = await axiosInstance.get("/user/check-user-pro");
        const user = response.data?.data;

        if (!user || user.role !== "pro") {
          navigate("/user/check-out", { replace: true }); // Redirect to payment page
        }
      } catch (error) {
        console.error(
          "Error checking pro status:",
          error.response?.data?.message || error.message
        );
        navigate("/user/check-out", { replace: true }); // Fallback: go to payment
      } finally {
        if (isMounted) setIsChecking(false);
      }
    };

    checkProUser();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return isChecking ? <div>Loading...</div> : <Outlet />;
};

export default ProUser;
