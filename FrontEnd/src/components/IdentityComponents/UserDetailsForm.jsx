import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/input_info-form.css";

const UserDetailsForm = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [resetRequested, setResetRequested] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchUserDetails = async (loggedInUserEmail) => {
    try {
      const response = await axios.get( `/api/Identity/GetUserDetails?email=${loggedInUserEmail}`, config );
      setUserDetails(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails(loggedInUserEmail);
  }, [loggedInUserEmail]);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (buttonDisabled) { return; }
    setButtonDisabled(true);

    try {
      const response = await axios.get( `/api/Identity/ForgotPassword?email=${loggedInUserEmail}` );
      if (response.status === 200) {
        setResetRequested(true);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setButtonDisabled(false);
    }
  };

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="page">
        <div className="cover">
          <h2 className="mb-3"> Profili juaj </h2>
          
          <p className="input pt-3"> <strong>Emri:</strong> {userDetails.username} </p>
          <p className="input pt-3"> <strong>E-Mail:</strong> {userDetails.email} </p>
          <p className="input pt-3"> <strong>Roli:</strong> {userDetails.roles.join(", ")} </p>

          {resetRequested ? (
            <div className="text-center">
              <p className="mt-4"> 
                Linku për ndryshimin e fjalëkalimit është dërguar në email-in tuaj. 
                Ju lutem kontrolloni email-in tuaj për të ndryshuar fjalëkalimin. 
              </p>
            </div>
          ) : ( 
            <form onSubmit={handleResetPassword} className="row">
              <div className="col-md-6">
                <button className="theButton" type="submit" disabled={buttonDisabled}>
                  Ndërro Fjalëkalimin
                </button>
              </div>

              <div className="col-md-6">
                <button className="theButton" style={{backgroundColor: "#f9a826", color: "black"}} onClick={() => handleRedirect("/deleteAccount")}>
                  <b> Fshij Llogarinë </b>
                </button>   
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetailsForm;
