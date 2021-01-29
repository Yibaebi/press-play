import http from "../httpService";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/activate-account";

const activateAccount = (token) => {
  return http.post(apiEndpoint, token);
};

export { activateAccount };
