import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const addCoupon = async (coupon) => {
    const url = `${Base_Url}/coupon`;
    
  const response = await axios.post(url, coupon, {
    headers: {
      "Content-Type": "application/json",
      token: `${getToken()}`,
    },
  });

  return response;
};
