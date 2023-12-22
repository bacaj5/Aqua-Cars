import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../../styles/crud.css";
  
const ReservationCrudForm = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservationName, setNewReservationName] = useState("");
  const [newReservationSecondName, setNewReservationSecondName] = useState("");
  const [newReservationEmail, setNewReservationEmail] = useState("");
  const [newReservationPhoneNumber, setNewReservationPhoneNumber] = useState("");
  const [newReservationNumberOfDays, setNewReservationNumberOfDays] = useState("");
  const [newReservationPickupLocation, setNewReservationPickupLocation] = useState("");
  const [newReservationPickupDate, setNewReservationPickupDate] = useState("");
  const [newReservationVehicleId, setNewReservationVehicleId] = useState("");
  const [newReservationLeaveAMessage, setNewReservationLeaveAMessage] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editReservationId, setEditReservationId] = useState(null);
  const [editedReservation, setEditedReservation] = useState({
    name: "",  secondName: "", eMail: "", phoneNumber: "", numberOfDays: "",
    pickUpLocation: "", pickUpDate: "", vehicleId: "", leaveAMessage: "",
  });

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/reservation", config);
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReservation = async () => {
    try {
      const newReservation = {
        name: newReservationName,
        secondName: newReservationSecondName,
        eMail: newReservationEmail,
        phoneNumber: newReservationPhoneNumber, 
        numberOfDays: newReservationNumberOfDays, 
        pickUpLocation: newReservationPickupLocation, 
        pickUpDate: newReservationPickupDate, 
        vehicleId: newReservationVehicleId,
        leaveAMessage: newReservationLeaveAMessage,
      };

      await axios.post("/api/reservation", newReservation, config);

      fetchReservations();
      setNewReservationVehicleId(""); setNewReservationName(""); setNewReservationSecondName(""); setNewReservationPhoneNumber("");
      setNewReservationEmail(""); setNewReservationNumberOfDays(""); setNewReservationPickupLocation(""); setNewReservationPickupDate(""); setNewReservationLeaveAMessage("");
      setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } catch (error) {
      console.error("Error adding reservation:", error);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    }
  };

  const handleStartEdit = (reservation) => {
    setEditReservationId(reservation.id);
    setEditedReservation(reservation);
  };

  const handleEditReservation = async () => {
    try {
      const updatedReservation = {
        id: editReservationId,
        name: editedReservation.name,
        secondName: editedReservation.secondName,
        eMail: editedReservation.eMail,
        phoneNumber: editedReservation.phoneNumber, 
        numberOfDays: editedReservation.numberOfDays, 
        pickUpLocation: editedReservation.pickUpLocation, 
        pickUpDate: editedReservation.pickUpDate, 
        vehicleId: editedReservation.vehicleId,
        leaveAMessage: editedReservation.leaveAMessage,
      };

      await axios.put(`/api/Reservation`, updatedReservation, config);

      fetchReservations();
      setEditReservationId(null);
    } catch (error) {
      console.error("Error editing reservation:", error);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    const confirmed = window.confirm("Jeni të sigurtë që dëshironi ta fshini këtë rezervim?");
    if(confirmed) {
      try {
        await axios.delete(`/api/Reservation`, {data: {id: reservationId }, headers: { Authorization: `Bearer ${token}`} });
        fetchReservations();
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  return (
    <div className="crud-container">

      <div className='list-unstyled'>
        <li>
          <NavLink exact to="/admin/categories" className="px-5"> 
            <b> Kategoritë </b>
          </NavLink>
          <NavLink exact to="/admin/subcategories" className="px-5">
            <b> SubKategoritë </b>
          </NavLink>
          <NavLink exact to="/admin/vehicles" className="px-5">
            <b> Veturat </b>
          </NavLink>
          <NavLink exact to="/admin/reservations" className="px-5 text-black">
            <b> Rezervimet </b>
          </NavLink>
          <NavLink exact to="/admin/identity" className="px-5">
            <b> Përdoruesit </b>
          </NavLink>
        </li>
      </div>

      <div className="add-form">
        <input
          type="text"
          value={newReservationVehicleId}
          placeholder="Id-ja e Makinës"
          onChange={(e) => setNewReservationVehicleId(parseInt(e.target.value))}
        />  
        
        <input
          type="text"
          value={newReservationName}
          placeholder="Emri"
          onChange={(e) => setNewReservationName(e.target.value)}
        />

        <input
          type="text"
          value={newReservationSecondName}
          placeholder="Mbiemri"
          onChange={(e) => setNewReservationSecondName(e.target.value)}
        />

        <input
          type="text"
          value={newReservationEmail}
          placeholder="E-Mail"
          onChange={(e) => setNewReservationEmail(e.target.value)}
        />

        <input
          type="text"
          value={newReservationPhoneNumber}
          placeholder="Numri Kontaktues"
          onChange={(e) => setNewReservationPhoneNumber(e.target.value)}
        />

        <input
          type="text"
          value={newReservationNumberOfDays}
          placeholder="Numri i Ditëve"
          onChange={(e) => setNewReservationNumberOfDays(parseInt(e.target.value))}
        />

        <input
          type="text"
          value={newReservationPickupLocation}
          placeholder="Lokacioni i Marrjes"
          onChange={(e) => setNewReservationPickupLocation(e.target.value)}
        />

        <input
          type="date"
          value={newReservationPickupDate}
          placeholder="Data e Marrjes"
          onChange={(e) => setNewReservationPickupDate(e.target.value)}
        />

        <input
          type="text"
          value={newReservationLeaveAMessage}
          placeholder="Leni një Mesazh"
          onChange={(e) => setNewReservationLeaveAMessage(e.target.value)}
        />

        <button className="submit-button" onClick={handleAddReservation}>
          Shto Rezervimin
        </button>

        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3">Rezervimi është shtuar me sukses!</div>
        )}

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3"> Rezervimi nuk u shtua me sukses! Provo përsëri.</div>
        )}
      </div>

      {loading ? (
        <h4 style={{margin:"70px 10px"}}>Loading reservations...</h4>
      ) : (
        reservations.length === 0 ? (
          <h3 style={{margin:"105px 10px"}}> Nuk ekziston ndonjë rezervim. </h3>
        ) : (
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id}>
                {editReservationId === reservation.id ? (
                  <>
                    <div>
                      <b>Emri: </b>
                      <input
                        type="text"
                        value={editedReservation.name}
                        onChange={(e) => setEditedReservation({ ...editedReservation, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>Mbiemri: </b>
                      <input
                        type="text"
                        value={editedReservation.secondName}
                        onChange={(e) => setEditedReservation({ ...editedReservation, secondName: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>E-Mail: </b>
                      <input
                        type="text"
                        value={editedReservation.eMail}
                        onChange={(e) => setEditedReservation({...editedReservation, eMail: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>Numri Kontaktues: </b>
                      <input
                        type="text"
                        value={editedReservation.phoneNumber}
                        onChange={(e) => setEditedReservation({...editedReservation, phoneNumber: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>Lokacioni i Marrjes: </b>
                      <input
                        type="text"
                        value={editedReservation.pickUpLocation}
                        onChange={(e) => setEditedReservation({ ...editedReservation, pickUpLocation: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>Data e Marrjes: </b>
                      <input
                        type="date"
                        value={editedReservation.pickUpDate}
                        onChange={(e) => setEditedReservation({ ...editedReservation, pickUpDate: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>Id-ja e Makinës: </b>
                      <input
                        type="text"
                        value={editedReservation.vehicleId}
                        onChange={(e) => setEditedReservation({ ...editedReservation, vehicleId: parseInt(e.target.value) })}
                      />
                    </div>

                    <div>
                      <b>Numri i Ditëve: </b>
                      <input
                        type="text"
                        value={editedReservation.numberOfDays}
                        onChange={(e) => setEditedReservation({ ...editedReservation, numberOfDays: parseInt(e.target.value) })}
                      />
                    </div>

                    <div>
                      <b>Leni një Mesazh: </b>
                      <input
                        type="text"
                        value={editedReservation.leaveAMessage}
                        onChange={(e) => setEditedReservation({ ...editedReservation, leaveAMessage: (e.target.value) })}
                      />
                    </div>

                    <button className="submit-button" onClick={handleEditReservation}>
                      Ruaj
                    </button>

                    <button className="aButton" onClick={() => setEditReservationId(null)}>
                      Kthehu
                    </button>
                  </>
                ) : (
                  <>
                    <div> <b>Id: </b> {reservation.id} </div>
                    <div> <b>Emri: </b> {reservation.name} </div>
                    <div> <b>Mbiemri: </b> {reservation.secondName} </div>
                    <div> <b>E-Mail: </b> {reservation.eMail} </div>
                    <div> <b>Numri Kontaktues: </b> {reservation.phoneNumber} </div>
                    <div> <b>Lokacioni i Marrjes: </b> {reservation.pickUpLocation} </div>
                    <div> <b>Data e Marrjes: </b> {reservation.pickUpDate} </div>
                    <div> <b>Data e Rezervimit: </b> {reservation.payDate} </div>
                    <div> <b>Id-ja e Makinës: </b> {reservation.vehicleId} </div>
                    <div> <b>Numri i Ditëve: </b> {reservation.numberOfDays} </div>
                    <div> <b>Çmimi Total: </b> €{reservation.totalPay}.00 </div>
                    <div> <b>Mesazhi: </b> {reservation.leaveAMessage} </div>
                    
                    <div className="button-container">
                      <button className="aButton" onClick={() => handleStartEdit(reservation)} >
                        Edito
                      </button>

                      <button className="submit-button" onClick={() => handleDeleteReservation(reservation.id)} >
                        Fshij
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default ReservationCrudForm;
