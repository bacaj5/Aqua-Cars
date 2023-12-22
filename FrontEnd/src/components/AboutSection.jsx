import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/about-section.css";
import aboutImg from "../all-images/bmw-offer.png";

const AboutSection = () => {
  return (
    <section className="about__section" style={{ marginTop: "0px" }}>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">Rreth nesh</h4>
              <h2 className="section__title">Mirësevini ne AquaCars</h2>
              <p className="section__description">
                Mirësevini në kompaninë tonë të rentimit të veturave.
                Ky website ka për qëllim që të kryej sa ma shumë punë ne industrinë e veturave.
                Ne ofrojmë një lloj-llojshmëri të veturave dhe modelet më të reja. Gjithuashu ofrojmë nje servis dhe zbritjet
                më të mira në treg. Na Kontaktoni!               
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Vetura të reja.
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Pegesat në mënyrë digjitale.
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Cmime të ulëta.
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Kualiteti i lartë.
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
          
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
