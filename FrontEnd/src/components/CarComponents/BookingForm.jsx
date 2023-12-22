import React, { useState } from "react";
import { Form, FormGroup } from "reactstrap";
import { Col } from "reactstrap";
import axios from "axios";
import "../../styles/booking-form.css";

const BookingForm = ({ car }) => {
  const { id, pricePerDay } = car;
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [leaveAMessage, setLeaveAMessage] = useState("");
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleNumberOfDaysChange = (e) => {
    const days = parseInt(e.target.value);
    setNumberOfDays(days);
    setTotalPaymentAmount(days * pricePerDay);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (buttonDisabled) { return; }
    setButtonDisabled(true);

    const emailOfUser = localStorage.getItem("loggedInUserEmail");
    const payload = {
      name, secondName,
      eMail: emailOfUser,
      phoneNumber,
      numberOfDays,
      pickUpLocation,
      pickUpDate,
      leaveAMessage,
      totalPay: totalPaymentAmount,
      vehicleId: id,
    };

    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await axios.post("/api/Reservation", payload, config);
      console.log(response.data);

      setName(""); setSecondName(""); setPhoneNumber(""); setNumberOfDays("");
      setPickUpLocation(""); setPickUpDate(""); setLeaveAMessage(""); setTotalPaymentAmount(0);
      setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } catch (error) {
      console.error(error);
      
      const errorMessage = error.response && error.response.data && error.response.data.message 
      ? error.response.data.message : "Rezervim i pasuksesshëm! Provo përsëri.";
      
      setErrorMessages([errorMessage]);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <Col lg="12" className="mt-5">
      <h5 className="mb-4 fw-bold">Informatat për Rezervim</h5>

      <Form onSubmit={handleSubmit}>
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Emri"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <input
            type="text"
            name="secondName"
            placeholder="Mbiemri"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Numri Kontaktues"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <input
            type="text"
            name="pickUpLocation"
            placeholder="Lokacioni i Marrjes së Veturës"
            value={pickUpLocation}
            onChange={(e) => setPickUpLocation(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input
            type="date"
            name="pickUpDate"
            placeholder="Pick-Up Date"
            value={pickUpDate}
            onChange={(e) => setPickUpDate(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <input
            type="text"
            name="numberOfDays"
            placeholder="Numri i Ditëve"
            value={numberOfDays}
            onChange={handleNumberOfDaysChange}
          />
        </FormGroup>

        <FormGroup>
          <textarea
            type="text"
            name="leaveAMessage"
            placeholder="   Leni një Mesazh"
            value={leaveAMessage}
            onChange={(e) => setLeaveAMessage(e.target.value)}
            rows={3}
            className="textarea"
          />
        </FormGroup>

        <p className="my-0 py-0">
          <strong> Çmimi Total: </strong> €{totalPaymentAmount}.00
        </p>

        <div className="payment mt-2 text-center">
          <button type="submit" disabled={buttonDisabled}>
            Rezervo
          </button>
        </div>

        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3">
            Rezervim i suksesshëm!
          </div>
        )}

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3 text-center">
            {errorMessages[0]}
          </div>
        )}

      </Form>
    </Col>
  );
};

export default BookingForm;
