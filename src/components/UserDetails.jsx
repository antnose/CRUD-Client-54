import React from "react";
import { useLoaderData } from "react-router";

const UserDetails = () => {
  const user = useLoaderData();
  return (
    <div>
      <h1>This is user details</h1>
    </div>
  );
};

export default UserDetails;
