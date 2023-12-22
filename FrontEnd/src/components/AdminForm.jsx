import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "../styles/admin-section.css";
import aboutImg from "../all-images/b.png";
import aboutImg2 from "../all-images/a.png";

const AdminForm = () => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <section className="admin-section">
      <Container>
        <Row>
          <Col lg="4" md="4">
            <div className="d-flex align-items-center justify-content-center">
              <img src={aboutImg}/>
            </div>
          </Col>

          <Col lg="4" md="4">
              <div className="d-flex align-items-center justify-content-center">
                <ul className="list-unstyled mb-0">
                  <li>
                    <button className="button" onClick={() => handleRedirect("/admin/categories")}>
                      Managjo Kategoritë
                    </button>
                  </li>

                  <li>
                    <button className="button" onClick={() => handleRedirect("/admin/subcategories")}>
                      Managjo SubKategoritë
                    </button>
                  </li>

                  <li>
                    <button className="button" onClick={() => handleRedirect("/admin/vehicles")}>
                      Managjo Veturat
                    </button>
                  </li>

                  <li>
                    <button className="button" onClick={() => handleRedirect("/admin/reservations")}>
                      Managjo Rezervimet
                    </button>
                  </li>

                  <li>
                    <button className="button mb-3" onClick={() => handleRedirect("/admin/identity")}>
                      Managjo Perdoruesit
                    </button>
                  </li>
                </ul>
              </div>
          </Col>

          <Col lg="4" md="4">
            <div className="d-flex align-items-center justify-content-center">
              <img src={aboutImg2} alt=""/>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminForm;
