import axios from "axios";
import { getToken } from './../../../Functions/getToken';
import { Base_Url } from './../../baseUrl';

export const getAllCoupons = async () => {
    const url = `${Base_Url}/coupon`;
  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response.data.coupons;
};
