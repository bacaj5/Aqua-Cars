import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/input_info-form.css";
                  
const ResetPasswordForm = () => {
  const { email, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
      return;
    }

    try {
      const response = await axios.post("/api/Identity/ResetPassword", {
        email: email, token: token, newPassword: newPassword, confirmPassword: confirmPassword
      });
      
      console.log(response.data);
      setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } catch (error) {
      console.log(error);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleResetPassword}>
        <div className="cover">
          <h3 className="mb-4">Ndërro Fjalëkalimin</h3>

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input"
            placeholder="Fjalëkalimi i Ri"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            placeholder="Konfirmo Fjalëkalimin"
          />

          <button type="submit" className="theButton">
            Ndërro Fjalëkalimin
          </button>

        </div>

        {submissionStatus === "success" && (
        <div className="alert alert-success mt-3 text-center">
          Ndryshim i sukesshëm!
        </div>
        )}

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3 text-center">
            Ndryshim i pasuksesshëm! Provo përsëri.
          </div>
        )}

      </form>
    </div>
  );
};

export default ResetPasswordForm;
