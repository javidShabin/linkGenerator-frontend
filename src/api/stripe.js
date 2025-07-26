import { axiosInstance } from "../config/axiosInstance";

export const createCheckout = async (plan) => {
    console.log(plan, "====plam")
  const response = await axiosInstance.post("/payment/create-checkout-session", {
    plan, // send plan info to backend
  });


  return response.data.url; // Stripe checkout URL
};