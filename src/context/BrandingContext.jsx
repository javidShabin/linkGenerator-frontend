import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../configs/axiosInstance";

export const BrandingContext = createContext({
	buttonColor: "#ffffff",
	logoText: null,
	logoUrl: null,
	logoColor: "#ffffff",
	textColor: "#fffff",
	isLoading: false,
	error: null,
	setBranding: () => {},
});

export const useBranding = () => useContext(BrandingContext);


export const BrandingProvider = ({ children }) => {
    const [brandingState, setBrandingState] = useState({
        buttonColor: "#a855f7",
        logoText: "",
        logoUrl: null,
        logoColor: "#ffffff",
        textColor: "#ffffff",
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const fetchBranding = async () => {
            try {
                const res = await axiosInstance.get("/branding/site");
                const data = res?.data?.data || res?.data || {};
                setBrandingState((prev) => ({
                    ...prev,
                    buttonColor: data.buttonColor ?? prev.buttonColor,
                    logoText: data.logoText ?? prev.logoText,
                    logoUrl: data.logoUrl ?? prev.logoUrl,
                    logoColor: data.logoColor ?? prev.logoColor,
                    textColor: data.textColor ?? prev.textColor,
                    isLoading: false,
                    error: null,
                }));
            } catch (e) {
                setBrandingState((prev) => ({ ...prev, isLoading: false, error: e }));
            }
        };
        fetchBranding();
    }, []);

    const setBranding = (updater) => {
        setBrandingState((prev) => {
            if (typeof updater === "function") return updater(prev);
            if (updater && typeof updater === "object") return { ...prev, ...updater };
            return prev;
        });
    };

    return (
        <BrandingContext.Provider value={{ ...brandingState, setBranding }}>
            {children}
        </BrandingContext.Provider>
    );
};


