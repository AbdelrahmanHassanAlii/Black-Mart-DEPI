import axios from "axios";
import { Base_Url } from './../../baseUrl';
import { getToken } from './../../../Functions/getToken';

export const updateCoupon = async (couponID, coupon) => {
    const url = `${Base_Url}/coupon/${couponID}`;

  const response = await axios.put(url, coupon, {
    headers: {
      "Content-Type": "application/json",
      token: `${getToken()}`,
    },
  });

  return response;
};
