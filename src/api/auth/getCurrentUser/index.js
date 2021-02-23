import http from "../httpService";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/me";

const getCurrentUser = (token) => {
  return http.get(apiEndpoint, {
    headers: {
      authorization: token,
    },
  });
};

export { getCurrentUser };
