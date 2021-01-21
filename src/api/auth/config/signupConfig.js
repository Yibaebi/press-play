// import SignUpData from "../../../pages/signup";
// The sigup data will be gotten from the sign up page

const userEmail = "Elliotyy@genesystechhub.com";
const userPassword = "Elliot@123!";
const userName = "elliotyyibaebi";

const userData = {
  firstname: "Chidi",
  lastname: userName,
  gender: "Male",
  email: userEmail,
  password: userPassword,
};

export const SignUpConfig = {
  method: "POST",
  url: "https://mama-sauce-api.herokuapp.com/user/signup",
  headers: {
    "Content-Type": "application/json",
  },
  data: JSON.stringify(userData),
};
