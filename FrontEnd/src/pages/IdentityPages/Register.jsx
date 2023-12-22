import React, { useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/IdentityComponents/RegisterForm";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/NotFound");
  }, [navigate]);

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
