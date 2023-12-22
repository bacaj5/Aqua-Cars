import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "reactstrap";
import axios from "axios";
import CartItem from "../components/CartItem";
import CommonSection from "../components/CommonSection";
import { useIsNotAuthorized } from "../components/useIsNotAuthorized";

const Cart = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const emailOfUser = localStorage.getItem("loggedInUserEmail");
      const response = await axios.get( `/api/Reservation/user/${emailOfUser}`, config );

      setReservations(response.data); setLoading(false);
    } catch (error) {
      setError(error); setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const isNotAuthorized = useIsNotAuthorized();
  if (isNotAuthorized) { return navigate("/login"); }

  if (error) { return <div>Error: {error.message}</div>; }
  if (loading) { return <div>Loading... </div>; }

  return (
    <>
      <CommonSection title="Rezervimet e Bëra" />

      <section>
        <Container>
          <Row>
            {reservations.length === 0 ? (
              <div style={{height:"200px", textAlign:"center"}}> Ju ende nuk keni bëre ndonjë rezervim.</div>
            ) : (
              reservations.map((reservation) => (
                <CartItem
                  key={reservation.id}
                  reservation={reservation}
                  fetchReservations={fetchReservations}
                />
              ))
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Cart;
