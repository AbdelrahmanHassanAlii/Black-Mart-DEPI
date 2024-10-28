import axios from "axios";
import { getToken } from "../../../Functions/getToken";
import { Base_Url } from "../../baseUrl";

export const addProduct = async (product) => {
  const url = `${Base_Url}/product`;
  try {
    const response = await axios.post(url, product, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `${getToken()}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Full error object:", error);
  }
};
