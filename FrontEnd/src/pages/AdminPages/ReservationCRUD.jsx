import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ReservationCrudForm from "../../components/AdminComponents/ReservationCrudForm";

const ReservationCRUD = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") navigate("/NotFound");
  }, [navigate]);

  return (
    <>
      <ReservationCrudForm />
    </>
  );
};

export default ReservationCRUD;
