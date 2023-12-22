import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return ( 
    <div style={{marginBottom:"145px", marginTop:"80px"}}>
      <div className="d-flex align-items-center justify-content-center m-5 p-5">
          <div className="text-center">
            <h1 className="display-1 fw-bold" style={{color:"black"}}> <b>404</b> </h1>
            <p className="fs-3"> <span className="text-danger">Oops!</span> Page not found.</p>
            <p className="lead">
              <b> The page you're looking for doesn't exist. </b>
            </p>
              <Link to="/" className="btn" style={{background:"black", color:"white"}}> Go Home </Link>
          </div>
      </div>
    </div>
  )
};

export default NotFound;
