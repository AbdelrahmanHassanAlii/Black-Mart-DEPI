import axios from "axios";
import { Base_Url } from './../../baseUrl';
import { getToken } from './../../../Functions/getToken';

export const deleteUser = async (userID) => {
    const url = `${Base_Url}/user/${userID}`;

  const response = await axios.delete(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response;
};
