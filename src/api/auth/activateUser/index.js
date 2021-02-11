import http from "../httpService";
import { activationUrl } from "../../../config.json";

const activateAccount = (token) => {
  const apiEndpoint = activationUrl + `?token=${token}`;
  return http.get(apiEndpoint);
};

export { activateAccount };
