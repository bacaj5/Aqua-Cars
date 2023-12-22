import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="9" md="9" sm="12">
            <div className="footer__logo">
              <h1>
                <i class="ri-arrow-up-circle-fill" style={{ color: "#f9a826" }}> </i>
                <span>
                  AquaCars Company
                </span>
              </h1>
            </div>
            <p className="footer__logo-content">
              Ky website ka për qellim që të mundësojë marrjen e veturave me qera në mënyrë digjitale! Na kontaktoni nëse keni ndonjë paqartësi.
            </p>
          </Col>

          <Col lg="3" md="3" sm="6">
            <div className="mb-5 text-center">
              <h5 className="footer__link-title mt-5 mb-4"> Info: </h5>
              <p className="office__info">Orari: 10am - 7pm</p>
              <p className="office__info">Lokacioni: Zajm. Rruga Iliria dhe Rruga Arrave</p>
              <p className="office__info">Nr. Kontaktues: +383 49 20 60 20</p>
              <p className="office__info">E-Mail: aquacars@gmail.com </p>
            </div>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
