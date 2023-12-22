import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsNotAuthorized } from "../../components/useIsNotAuthorized";
import DeleteAccountForm from "../../components/IdentityComponents/DeleteAccountForm";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const isNotAuthorized = useIsNotAuthorized();
  if (isNotAuthorized) { return navigate("/login"); }
  
  return (
    <div>
      <DeleteAccountForm />
    </div>
  );
};

export default DeleteAccount;
