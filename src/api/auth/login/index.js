import axios from "axios";

const LogUserIn = async (userLogInData) => {
  var logInResponse = "";
  const LogInConfig = {
    method: "POST",
    url: "https://mama-sauce-api.herokuapp.com/user/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(userLogInData),
  };

  console.log("Login configuration", LogInConfig);
  console.log("Received User Details", userLogInData);

  await axios(LogInConfig)
    .then((response) => (logInResponse = JSON.stringify(response.data.message)))
    .catch((error) => {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        logInResponse = error.response.data;
        logInResponse = error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the
        // browser and an instance of
        // http.ClientRequest in node.js
        logInResponse = error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        logInResponse = error.message;
      }
    });

  console.log("Log in response", logInResponse);
  return logInResponse;
};

export { LogUserIn };
