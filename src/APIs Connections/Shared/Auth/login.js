import axios from "axios";
import { Base_Url } from "../../baseUrl";

export const login = async (user) => {
  const url = `${Base_Url}/auth/login`;

  const response = await axios.post(url, user);

  return response;
};
