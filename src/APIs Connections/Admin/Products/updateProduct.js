import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const updateProduct = async (productID, product) => {
    const url = `${Base_Url}/product/${productID}`;
  const response = await axios.put(url, product, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: `${getToken()}`,
    },
  });

  return response;
};
