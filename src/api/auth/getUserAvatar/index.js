import http from "../httpService";

const getUserAvatar = (firstName, LastName) => {
  return http.get(`https://ui-avatars.com/api/?name=Elon+Musk`);
};

console.log(getUserAvatar());

export { getUserAvatar };
