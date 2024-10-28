import axios from "axios";
import { getToken } from "../../../Functions/getToken";
import { Base_Url } from "../../baseUrl";

export const getSpecificUser = async (userID) => {
  const url = `${Base_Url}/user/${userID}`;

  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response;
};
