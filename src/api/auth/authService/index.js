import http from "../httpService";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/login";

export const login = (email, password) => {
  return http.post(apiEndpoint, {
    email,
    password,
  });
};
