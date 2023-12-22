import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/input_info-form.css";

const DeleteAccountForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (loggedInUserEmail !== email) {
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
      return;
    }

    try {
      const confirmed = window.confirm("Jeni të sigurtë që dëshironi ta fshini llogarinë tuaj?");
      if(confirmed) {
        await axios.delete("/api/identity/DeleteUser", {data: {email: data.email, password: data.password }, headers: { Authorization: `Bearer ${token}`} });
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("loggedInUserEmail");
        localStorage.removeItem("role");

        setEmail(""); setPassword("");
        setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleDelete}>
        <div className="cover">
          <h3> Fshij Llogarinë </h3>
          <p className="mb-3">Ju lutemi konfirmoni informacionet tuaja për të fshirë llogarinë.</p>

          <input
            className="input"
            type="text"
            placeholder="Konfirmo Email-in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Konfirmo Fjalëkalimin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="theButton">
            Fshij
          </button>
        </div>

        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3 text-center">
            LLogaria juaj është fshirë me sukses!
          </div>
        )}

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3 text-center">
            Tentim i pasuksesshëm! Provo përsëri.
          </div>
        )}
      </form>
    </div>
  );
};

export default DeleteAccountForm;
