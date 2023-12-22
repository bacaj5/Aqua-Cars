import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import SubCategoryCrudForm from "../../components/AdminComponents/SubCategoryCrudForm";

const SubCategoryCRUD = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") navigate("/NotFound");
  }, [navigate]);

  return (
    <>
      <SubCategoryCrudForm />
    </>
  );
};

export default SubCategoryCRUD;
