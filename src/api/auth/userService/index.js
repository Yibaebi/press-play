import http from "../httpService";
import { apiUrl } from "../../../config.json";

export function register(user) {
  const apiEndpoint = apiUrl + "/signup";
  return http.post(apiEndpoint, {
    email: user.userEmail,
    firstName: user.userFirstName,
    lastName: user.userLastName,
    password: user.userPassword,
  });
}

export function resetPassword(resetEmail) {
  const apiEndpoint = apiUrl + "/forgot-password";
  return http.put(apiEndpoint, {
    email: resetEmail,
  });
}

export function confirmPasswordReset(newPassword, token) {
  const apiEndpoint = apiUrl + "/reset-password";
  return http.put(apiEndpoint, {
    newPassword: newPassword,
    token: token,
  });
}
