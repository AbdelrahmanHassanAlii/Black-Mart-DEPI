import axios from "axios";
import { getToken } from "../../../Functions/getToken";
import { Base_Url } from "../../baseUrl";

export const deleteCategory = async (categoryID) => {
  const url = `${Base_Url}/categories/${categoryID}`;

  const response = await axios.delete(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response;
};
