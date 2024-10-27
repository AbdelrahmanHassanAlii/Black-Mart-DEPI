import axios from "axios";
import { getToken } from "../../../Functions/getToken";
import { Base_Url } from "../../baseUrl";

export const getAllCategories = async () => {
  const url = `${Base_Url}/categories`;

  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response.data.categories;
};
