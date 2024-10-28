import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const getAllUsers = async () => {
  const url = `${Base_Url}/user`;

  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response;
};
