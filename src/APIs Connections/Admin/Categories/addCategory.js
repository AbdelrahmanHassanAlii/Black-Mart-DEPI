import axios from "axios";
import { getToken } from "../../../Functions/getToken";
import { Base_Url } from "../../baseUrl";

export const addCategory = async (category) => {
  const url = `${Base_Url}/categories`;

  const response = await axios.post(url, category, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: `${getToken()}`,
    },
  });

  return response;
};
