import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/input_info-form.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post("/api/identity/login", data);
      const { token, expiration, userRoles } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", expiration);
      localStorage.setItem("loggedInUserEmail", email);
      localStorage.setItem("role", userRoles);

      setEmail(""); setPassword("");
      setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
      navigate("/");
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleLogin}>
        <div className="cover">
          <h2 className="mb-4">Kyçu</h2>

          <input
            className="input"
            type="text"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Fjalëkalimi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="theButton mb-3">
            Kyçu
          </button>

          <Link to={`/forgotpassword`}>Keni harruar fjalëkalimin?</Link>      
        </div>

        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3 text-center"> 
            Kyçje e suksesshme! 
          </div>
        )}

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3 text-center">
            Kyçje e pasuksesshme! Provo përsëri.
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
