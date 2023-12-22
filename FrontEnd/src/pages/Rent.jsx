import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookingForm from "../components/CarComponents/BookingForm";
import CarDetails from "../components/CarComponents/CarDetails";
import CommonSection from "../components/CommonSection";
import { useIsNotAuthorized } from "../components/useIsNotAuthorized";

const Rent = () => {
  const { id } = useParams();
  const [car, setCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchCar = async () => {
    try {
      const response = await axios.get(`/api/Vehicle/${id}`, config);
      setCar(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  const isNotAuthorized = useIsNotAuthorized();
  if (isNotAuthorized) { return navigate("/login"); }

  if (loading) { return <div>Loading...</div>; }
  if (error) { return <div>Error: {error.message}</div>; }

  return (
    <>
      <CommonSection title="Rezervimi" />
      <section>
        <Container>
          <Row>
            <CarDetails car={car} />
            <BookingForm car={car} />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Rent;
