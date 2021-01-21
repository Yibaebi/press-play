import axios from "axios";

const simpleForm = async (SignUpConfig) => {
  let receivedResponse = "";
  await axios(SignUpConfig)
    .then(function (response) {
      receivedResponse = JSON.stringify(response.data.message);
    })
    .catch(function (error) {
      console.log(error);
    });

  return receivedResponse;
};

export { simpleForm };
