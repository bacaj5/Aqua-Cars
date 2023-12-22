import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
 
const CarItem = ({ car }) => {  
  const { id, model, kilometersPerHour, prodYear, pricePerDay, subCategoryName, photoFilePath } = car;
  
  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">

        <div className="car__img">
          <img src={photoFilePath} alt="error" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{model}</h4>
          <h6 className="rent__price text-center mt-">
            €{pricePerDay}.00 <span>/ Dita</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {subCategoryName}
            </span>

            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {kilometersPerHour} Km/H
            </span>
            
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-time-line"></i> {prodYear}
            </span>
          </div>

            <Link to={`/cars/${id}`} style={{textDecoration:"none"}}>
              <button className="w-100 car__item-btn">
                Rent
              </button>
            </Link>

        </div>
      </div>
    </Col>
  );
};

export default CarItem;
