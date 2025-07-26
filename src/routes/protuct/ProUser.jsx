import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Outlet, useNavigate } from "react-router-dom";

const ProUser = () => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProUser = async () => {
      try {
        const response = await axiosInstance.get("/user/check-pro");
        const user = response.data.user;

        if (user.role !== "pro") {
          navigate("/user/check-out"); // Navigate if not pro
        }
      } catch (error) {
        console.log("Error checking pro status:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkProUser();
  }, [navigate]);

  return isChecking ? null : <Outlet />;
};

export default ProUser;
