import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const role = localStorage.getItem("role");
  
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <span className="mx-2">
                <i class="ri-arrow-up-circle-fill" style={{ color: "#f9a826" }}></i> AquaCars
              </span>
              <span className="mx-3">
                <i class="ri-phone-fill"></i> +383 49 20 60 20
              </span>
            </Col>

            <Col lg="6" md="6" sm="6">
              {loggedInUserEmail ? (
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">           
                  <Link to="/cart" className=" d-flex align-items-center gap-1">
                    <i class="ri-shopping-cart-fill"></i>
                  </Link>

                  <Link to="/userdetails" className=" d-flex align-items-center gap-1">
                    {loggedInUserEmail}
                  </Link>
                  
                  <button className="header__logout-btn" onClick={handleLogout}>
                    Shkyçu
                  </button>
                </div>
              ) : (
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                  <Link to="/login" className="d-flex align-items-center gap-1">
                    <i class="ri-login-circle-line"></i> Kyçu
                  </Link>

                  <Link to="/register" className="d-flex align-items-center gap-1">
                    <i class="ri-user-line"></i> Regjistrohu
                  </Link>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}
      <div className="main__navbar">
        <Container>
          <Col lg="6" md="6" sm="6" className="px-2">
            <div className="d-flex gap-5">
              <NavLink to="/" className={(navClass) => navClass.isActive ? "nav__active nav__item" : "nav__item "}>
                <i class="ri-car-line"></i> Veturat
              </NavLink>

              <NavLink to="/about" className={(navClass) => navClass.isActive ? "nav__active nav__item" : "nav__item"}>
               <i class="ri-presentation-fill"></i> Rreth Nesh
              </NavLink>

              {role === "Admin" ? 
                <NavLink to="/admin" className={(navClass) => navClass.isActive ? "nav__active nav__item" : "nav__item"}>
                  <i class="ri-admin-line"></i> Admin
                </NavLink> : ""
              } 
            </div>
          </Col>
        </Container>
      </div>
    </header>
  );
};

export default Header;
