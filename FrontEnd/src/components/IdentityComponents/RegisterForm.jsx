import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/input_info-form.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { username, email, password, confirmPassword };

    try {
      const response = await axios.post("/api/identity/register", data);
      console.log(response.data);

      setUsername(""); setEmail(""); setPassword(""); setConfirmPassword("");
      setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
      setTimeout(() => {navigate("/login")}, 3000);
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleRegister}>
        <div className="cover">
          <h2 className="mb-3">Regjistrohu</h2>

          <input
            className="input"
            type="text"
            placeholder="Emri"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input
            className="input"
            type="password"
            placeholder="Konfirmo Fjalëkalimin"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="theButton mt-3">
            Regjistrohu
          </button>
        </div>

        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3 text-center">
            Regjistrim i suksesshëm!
          </div>
        )}

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3 text-center">
            Regjistrim i pasuksesshëm! Provo përsëri.
          </div>
        )}
        
      </form>
    </div>
  );
};

export default RegisterForm;
