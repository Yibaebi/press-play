import React from "react";
import { AuthNavBar } from "../../../widgets";
import { IconLoader } from "./../../../utilities/loader/index";

const Home = ({ user }) => {
  return (
    <div>
      <AuthNavBar buttonLabel="Log in" link="/login" />

      <h1>Welcome Home {user}</h1>
      <IconLoader />
    </div>
  );
};

export { Home };
