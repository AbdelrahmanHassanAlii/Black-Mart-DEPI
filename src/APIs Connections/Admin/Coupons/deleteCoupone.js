import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const deleteCoupon = async (couponID) => {
    const url = `${Base_Url}/coupon/${couponID}`;
  const response = await axios.delete(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response;
};
