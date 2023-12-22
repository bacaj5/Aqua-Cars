import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import VehicleCrudForm from "../../components/AdminComponents/VehicleCrudForm";

const VehicleCRUD = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") navigate("/NotFound");
  }, [navigate]);

  return (
    <>
      <VehicleCrudForm />
    </>
  );
};

export default VehicleCRUD;
