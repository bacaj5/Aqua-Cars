import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/IdentityComponents/LoginForm";

const LogIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/NotFound");
  }, [navigate]);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LogIn;
