import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Routers from "./Routers";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
