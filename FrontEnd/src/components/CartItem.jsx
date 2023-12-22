import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart-item.css";
import { Col } from "reactstrap";

const CartItem = ({ reservation, fetchReservations }) => {
  const [vehicle, setVehicle] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchVehicleDetails();
  }, []);

  useEffect(() => {
    const currentTime = Date.now();
    const pickUpTime = new Date(reservation.pickUpDate).getTime();
    if(currentTime < pickUpTime)
      setShowDeleteButton(true);
  }, [reservation.pickUpTime]);

  const fetchVehicleDetails = async () => {
    try {
      const response = await axios.get(`/api/Vehicle/${reservation.vehicleId}`, config);
      setVehicle(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRezervation = async () => {
    const confirmed = window.confirm("Jeni të sigurtë që dëshironi ta anuloni këtë rezervim?");
    if(confirmed) {
      try {
        await axios.delete('/api/reservation', {data: {id: reservation.id }, headers: { Authorization: `Bearer ${token}`} })
        fetchReservations();
      }catch(error) {
        console.log(error);
      }
    }
  };

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="cart-item">
        <div className="reservation-details">
          <p> <strong> Lokacioni i Marrjes: </strong> {reservation.pickUpLocation}</p>
          <p> <strong> Data e Marrjes: </strong> {reservation.pickUpDate}</p>
          <p> <strong> Ditët e Rezervimit: </strong> {reservation.numberOfDays}</p>
          <p> <strong> Çmimi Total: </strong> €{reservation.totalPay}.00</p>
          <p> <strong> Koha e Rezervimit: </strong> {reservation.payDate}</p>
        </div>

        {vehicle && (
          <div className="vehicle-details">
            <img src={vehicle.photoFilePath} alt="Car" />
            <h4> Rreth Veturës:</h4>

            <div className="one-row">
              <p className="px-2"> <strong>Modeli:</strong> {vehicle.model} </p>
              <p className="px-2"> <strong>Tipi:</strong> {vehicle.subCategoryName}</p>
            </div>  

            <p> <strong> Çmimi: </strong> €{vehicle.pricePerDay}.00 / Dita </p>
          </div>
        )}

        {showDeleteButton ? (
          <button className="deleteButton" onClick={handleDeleteRezervation}>
            Anulo Rezervimin
          </button>
        ) : (
          <p className="paragraph"> <b> Rezervimi nuk mund të anulohet sepse vetura është marrur për përdorim. </b> </p>
        )}

      </div>
    </Col>
  );
};

export default CartItem;
