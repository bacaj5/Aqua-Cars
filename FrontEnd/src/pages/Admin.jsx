import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CommonSection from "../components/CommonSection";
import AdminForm from "../components/AdminForm";

const Admin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") navigate("/NotFound");
  }, [navigate]);

  return (
    <>
      <CommonSection title="Administrimi" />
      <AdminForm />
    </>
  );
};

export default Admin;
