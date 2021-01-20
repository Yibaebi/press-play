import axios from "axios";

const baseURL = "https://simple-form-api.herokuapp.com/api/users";

axios.create({
  baseURL,
  method: "post",
  headers: {},
  data: data,
});
