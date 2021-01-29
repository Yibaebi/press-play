import React from "react";

const url_string = window.location.href;
console.log(url_string);
const url = new URL(url_string);
const token = url.searchParams.get("token");
console.log(token);
function ActivateAccount() {
  return <div>You have been successfully activated!</div>;
}

export { ActivateAccount };
