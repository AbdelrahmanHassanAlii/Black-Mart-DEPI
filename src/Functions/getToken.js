import { getItemFromLS } from "./getItemFromLS";

export const getToken = () => {
  const logingData = getItemFromLS("loginData");

  if (logingData && Array.isArray(logingData) && logingData.length > 0) {
    return logingData[0].token;
  } else {
    return null; 
  }
};
