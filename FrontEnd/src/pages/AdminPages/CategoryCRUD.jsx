import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CategoryCrudForm from "../../components/AdminComponents/CategoryCrudForm";

const CategoryCRUD = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") navigate("/NotFound");
  }, [navigate]);

  return (
    <>
      <CategoryCrudForm />
    </>
  );
};

export default CategoryCRUD;
