import axios from "axios";
import { Base_Url } from "./../../baseUrl";
import { getToken } from "./../../../Functions/getToken";

export const getAllOrders = async () => {
  const url = `${Base_Url}/order/allorder`;

  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response.data.orders;
};
