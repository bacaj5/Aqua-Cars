import React, { useState } from "react";
import "../../styles/input_info-form.css";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (isSubmitting) { return; }
    setIsSubmitting(true); 

    try { 
      const response = await axios.get( `/api/Identity/ForgotPassword?email=${email}`);
      console.log(response.data);
      setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleForgotPassword}>
        <div className="cover">
          <h3>Gjeni llogarinë tuaj</h3>
          <p className="mb-4"> Ju lutemi shkruani email-in për të kërkuar llogarinë tuaj. </p>
          
          <input
            className="input"
            type="text"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {submissionStatus === "success" ? (
            <div className="alert alert-success mt-3 text-center">
              <p> Linku për ndryshimin e fjalëkalimit është dërguar në email. </p>
              <p> Ju lutem kontrolloni email-in për të ndryshuar fjalëkalimin. </p>
            </div>
          ) : (
            <button type="submit" className="theButton" disabled={isSubmitting}>
              Kërko
            </button>
          )}
        </div>

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3 text-center">
           <p className="m-0"> Kërkimi juaj nuk dha asnjë rezultat. </p> 
           <p className="m-0"> Ju lutemi provoni përsëri me informacione të tjera. </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
