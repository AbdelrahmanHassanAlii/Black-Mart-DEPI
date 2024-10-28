import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const getSpecificSubcategoryData = async (subcategoryID) => {
  const url = `${Base_Url}/subcategory/${subcategoryID}`;

  try {
    const response = await axios.get(url, {
      headers: {
        token: `${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error.message);

    throw new Error("Failed to fetch subCategory. Please try again later.");
  }
};
