import axios from "axios";
import logger from "../logService";

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response && error.response >= 400 && error.response < 500;

//   if (!expectedError) {
//     logger.log(error);
//     alert("An unexpected error occured");
//   }

//   return Promise.reject(error);
// });

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
