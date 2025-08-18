import React, { createContext, useContext } from "react";

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


