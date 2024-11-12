import axios from "axios";
import { getToken } from "../../../Functions/getToken";
import { Base_Url } from "../../baseUrl";

export const getLoggingUserCart = async () => {
  const url = `${Base_Url}/cart/log`;

  try {
    const response = await axios.get(url, {
      headers: {
        token: `${getToken()}`,
      },
    });

    // Log the response and return the cart data
    // console.log(response.data.cart);
    if (response.data.cart === null) return [];
    return response.data.cart;
  } catch (error) {
    // Handle potential errors gracefully
    // console.error("Error fetching user cart:", error);
    return []; // Return an empty array if the request fails
  }
};
