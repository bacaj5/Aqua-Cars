import React from "react";
import { useNavigate } from "react-router-dom";
import UserDetailsForm from "../../components/IdentityComponents/UserDetailsForm";
import { useIsNotAuthorized } from "../../components/useIsNotAuthorized";

const UserDetails = () => {
  const navigate = useNavigate();

  const isNotAuthorized = useIsNotAuthorized();
  if (isNotAuthorized) { return navigate("/login"); }

  return (
    <div>
      <UserDetailsForm />
    </div>
  );
};

export default UserDetails;
