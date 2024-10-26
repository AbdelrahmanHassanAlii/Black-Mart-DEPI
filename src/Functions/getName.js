import { getItemFromLS } from "./getItemFromLS";

export const getName = () => {
  const logingData = getItemFromLS("loginData");

  if (logingData && Array.isArray(logingData) && logingData.length > 0) {
    return logingData[0].Payload.username;
  } else {
    return null;
    }
};