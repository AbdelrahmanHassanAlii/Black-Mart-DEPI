import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const updateSubcategory = async (subCategoryID, subCategory) => {
  const url = `${Base_Url}/subcategory/${subCategoryID}`;

  const response = await axios.put(url, subCategory, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: `${getToken()}`,
    },
  });

  return response;
};
