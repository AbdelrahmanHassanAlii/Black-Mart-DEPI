import { getItemFromLS } from "./getItemFromLS";

export const getRole = () => {
  const logingData = getItemFromLS("loginData");

  if (logingData && Array.isArray(logingData) && logingData[0]?.Payload?.role) {
    // console.log(logingData);
    return logingData[0].Payload.role;
  } else {
    console.error("Role not found or logingData is empty");
    return "user";
  }
};
