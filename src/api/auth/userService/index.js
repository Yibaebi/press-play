import http from "../httpService";
import { apiUrl } from "../../../config.json";

export function register(user) {
  const apiEndpoint = apiUrl + "/signup";
  return http.post(apiEndpoint, {
    email: user.userEmail,
    name: user.userName,
    password: user.userPassword,
  });
}

export function resetPassword(resetEmail) {
  const apiEndpoint = apiUrl + "/forgot-password";
  return http.put(apiEndpoint, {
    email: resetEmail,
  });
}
