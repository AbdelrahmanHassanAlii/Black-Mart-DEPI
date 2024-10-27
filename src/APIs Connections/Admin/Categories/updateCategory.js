import axios from "axios";
import { getToken } from './../../../Functions/getToken';
import { Base_Url } from './../../baseUrl';

export const updateCategory = async (categoryID, category) => {
  const url = `${Base_Url}/categories/${categoryID}`;

  const response = await axios.put(url, category, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: `${getToken()}`,
    },
  });

  return response;
};
