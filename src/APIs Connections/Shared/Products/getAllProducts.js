import axios from "axios";
import { getToken } from "../../../Functions/getToken";
import { Base_Url } from "../../baseUrl";

export const getAllProducts = async () => {
  const url = `${Base_Url}/product`;

  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response.data.products;
};
