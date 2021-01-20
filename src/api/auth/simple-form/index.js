const simpleForm = async () => {
    let response = fetch("https://simple-form-api.herokuapp.com/api/users");
    return response;
  };
  
  export { simpleForm };