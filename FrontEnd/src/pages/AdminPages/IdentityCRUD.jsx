import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import IdentityCrudForm from "../../components/AdminComponents/IdentityCrudForm";

const IdentityCRUD = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") navigate("/NotFound");
  }, [navigate]);

  return (
    <>
      <IdentityCrudForm />
    </>
  );
};

export default IdentityCRUD;
