import axios from "axios";
import { Base_Url } from './../../baseUrl';
import { getToken } from "../../../Functions/getToken";

export const blockUser = async (userID) => {
    const url = `${Base_Url}/user/block/${userID}`;
    const response = await axios.patch(
    url,
    {},
    {
      headers: {
        token: `${getToken()}`,
      },
    }
  );
  return response;
};
