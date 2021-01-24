import http from "../httpService";
import { apiUrl } from "../../../config.json";

const apiEndpoint = apiUrl + "/signup";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.userEmail,
    name: user.userName,
    password: user.userPassword,
  });
}
