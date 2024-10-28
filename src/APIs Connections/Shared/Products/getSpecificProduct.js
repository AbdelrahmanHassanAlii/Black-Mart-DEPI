import axios from "axios";
import { getToken } from "../../../Functions/getToken";
import { Base_Url } from "../../baseUrl";

export const getSpecificProduct = async (productID) => {
    const url = `${Base_Url}/product/${productID}`;
  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response;
};
