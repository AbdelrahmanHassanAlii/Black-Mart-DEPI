import { getItemFromLS } from "./getItemFromLS";

export const getEmail = () => {
  const logingData = getItemFromLS("loginData");

  if (logingData && Array.isArray(logingData) && logingData.length > 0) {
    return logingData[0].Payload.email;
  } else {
    return null;
  }
};
