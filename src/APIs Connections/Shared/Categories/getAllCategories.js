import axios from "axios";
import { getToken } from "../../../Functions/getToken";

export const getAllCategories = async () => {
  const url = "http://localhost:3000/api/v1/categories";

  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response.data.categories;
};
