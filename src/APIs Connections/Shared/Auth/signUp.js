import axios from "axios";
import { Base_Url } from "../../baseUrl";

export const signup = async (user) => {
  const url = `${Base_Url}/auth/signup`;

  const response = await axios.post(url, user);

  return response;
};
