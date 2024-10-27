import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const getAllSubCategories = async () => {
  const url = `${Base_Url}/subcategory`;

  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });
  return response.data.subCategory;
};
