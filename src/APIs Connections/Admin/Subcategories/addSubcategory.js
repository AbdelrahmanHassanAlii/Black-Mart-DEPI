import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const addSubcategory = async (subCategory) => {
  const url = `${Base_Url}/subcategory`;

  const response = await axios.post(url, subCategory, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: `${getToken()}`,
    },
  });

  return response;
};
