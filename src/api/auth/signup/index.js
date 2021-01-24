import axios from "axios";

const SignUserUp = async (signUpData) => {
  var logInResponse = "";
  const signUpConfig = {
    method: "POST",
    url: "https://mama-sauce-api.herokuapp.com/user/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(signUpData),
  };

  console.log("Login configuration", signUpConfig);
  console.log("Received User Details", signUpData);

  await axios(signUpConfig)
    .then((response) => console.log(JSON.stringify(response.data.message)))
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

export { SignUserUp };
