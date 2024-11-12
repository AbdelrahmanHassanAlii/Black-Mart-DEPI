import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const addToCart = async (data) => {
  const url = `${Base_Url}/cart`;

  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      token: `${getToken()}`,
    },
  });

  return response;
};
