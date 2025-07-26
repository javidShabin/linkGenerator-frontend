import { axiosInstance } from "../config/axiosInstance";

export const createCheckout = async () => {
  const res = await axiosInstance.post("/payment/create-checkout-session");
  return res.data.url;
};
