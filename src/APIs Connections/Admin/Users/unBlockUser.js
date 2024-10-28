import axios from "axios";
import { Base_Url } from "../../baseUrl";
import { getToken } from "../../../Functions/getToken";

export const unBlockUser = async (userID) => {
  const url = `${Base_Url}/user/unblock/${userID}`;

  const response = await axios.patch(
    url,
    {
      headers: {
        token: `${getToken()}`,
      },
    }
  );
  return response;
};
