import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import axios from "axios";
import CommonSection from "../components/CommonSection";
import CarItem from "../components/CarComponents/CarItem";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    try {
      const response = await axios.get("/api/Vehicle");
      console.log("API Response:", response);
      setCars(response.data); setLoading(false);
    }catch (error) {
      setError(error); setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []); 

  if (error) { return <div>Error: {error.message}</div>; }
  if (loading) { return <div>Loading...</div>; }
  
  return (
    <>
      <CommonSection title="Listimi i Veturave"/>
      
      <section>
        <Container>
          <Row>
            {cars.map((car) => (
              <CarItem key={car.id} car={car} />
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
