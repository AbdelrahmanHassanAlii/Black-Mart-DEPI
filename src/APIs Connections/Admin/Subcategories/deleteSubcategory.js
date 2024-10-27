import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const deleteSubCategory = async (subCategoryID) => {
  const url = `${Base_Url}/subcategory/${subCategoryID}`;

  const response = await axios.delete(url, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: `${getToken()}`,
    },
  });

  return response;
};
