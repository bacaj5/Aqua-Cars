import { Col } from "reactstrap";

const CarDetails = ({ car }) => {
  const { model, kilometersPerHour, prodYear, pricePerDay, engine, seatingCapacity, subCategoryName, photoFilePath, description } = car;

  return (
    <>
      <Col lg="6">
        <img src={photoFilePath} alt="Car" className="w-100 px-3" />
      </Col>

      <Col lg="6">
        <div>
          <h2 className="section__title">{model} {subCategoryName}</h2>

          <div className="d-flex align-items-center gap-5 mb-4 mt-3">
            <h6 className="rent__price fw-bold fs-4"> €{pricePerDay}.00 / Dita </h6>
          </div>

          <p className="section__description">{description}</p>

          <div className="d-flex align-items-center mt-3" style={{ columnGap: "4rem" }}>
            <span className="d-flex align-items-center gap-1 section__description">
              <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i> Tipi: {subCategoryName}
            </span>

            <span className="d-flex align-items-center gap-1 section__description">
              <i className="ri-timer-flash-line" style={{ color: "#f9a826" }}></i> Shpejtësia: {kilometersPerHour} Km/h
            </span>
                        
            <span className=" d-flex align-items-center gap-1 section__description">
              <i class="ri-building-2-line" style={{ color: "#f9a826" }}> </i> Automatik
            </span>
          </div>

          <div className=" d-flex align-items-center mt-3" style={{ columnGap: "2.8rem" }}>            
            <span className="d-flex align-items-center gap-1 section__description">
              <i className="ri-time-line" style={{ color: "#f9a826" }}></i> Viti i Prodhimit: {prodYear}
            </span>

            <span className=" d-flex align-items-center gap-1 section__description">
              <i class="ri-wheelchair-line" style={{ color: "#f9a826" }}> </i> Kapaciteti: {seatingCapacity}
            </span>

            <span className=" d-flex align-items-center gap-1 section__description">
              <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i> Motorri: {engine}
            </span>
          </div>
        </div>
      </Col>
    </>
  );
};

export default CarDetails;
