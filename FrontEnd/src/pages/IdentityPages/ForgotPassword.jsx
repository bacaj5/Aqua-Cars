import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../../components/IdentityComponents/ForgotPasswordForm";

const ForgotPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/NotFound");
  }, [navigate]);

  return (
    <ForgotPasswordForm />
  )
};

export default ForgotPassword;
