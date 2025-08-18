import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { axiosInstance } from "../configs/axiosInstance";
import { BrandingContext } from "../context/BrandingContext";

const UserLayout = () => {
  const [branding, setBranding] = useState({
    buttonColor: "#ffffff",
    logoText: null,
    logoUrl: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTheme = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/branding/site");
       
        const payload = response?.data?.data || response?.data || {};

        console.log(payload, "=====")
        const nextBranding = {
          buttonColor: payload.buttonColor,
          logoText: payload.logoText,
          logoUrl: payload.logoUrl,
          logoColor: payload.logoColor,
          textColor: payload.textColor

        };
        setBranding(nextBranding);
      } catch (error) {
        setError(error?.message || "Failed to load branding");
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    getTheme()
  }, [])
  return (
    <BrandingContext.Provider value={{ ...branding, isLoading, error, setBranding }}>
      <div>
        <Header />
        <Outlet />
      </div>
    </BrandingContext.Provider>
  );
};

export default UserLayout;
