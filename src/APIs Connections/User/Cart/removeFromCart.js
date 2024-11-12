import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const removeFromCart = async (id) => {
  const url = `${Base_Url}/cart/${id}`;

  const response = await axios.delete(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response;
};
