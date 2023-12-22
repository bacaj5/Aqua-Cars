import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Rent from "../pages/Rent";
import Cart from "../pages/Cart";
import LogIn from "../pages/IdentityPages/LogIn";
import Register from "../pages/IdentityPages/Register";
import UserDetails from "../pages/IdentityPages/UserDetails";
import ResetPassword from "../pages/IdentityPages/ResetPassword";
import ForgotPassword from "../pages/IdentityPages/ForgotPassword";
import DeleteAccount from "../pages/IdentityPages/DeleteAccount";
import Admin from "../pages/Admin";
import CategoryCRUD from "../pages/AdminPages/CategoryCRUD";
import SubCategoryCRUD from "../pages/AdminPages/SubCategoryCRUD.jsx";
import VehicleCRUD from "../pages/AdminPages/VehicleCRUD";
import ReservationCRUD from "../pages/AdminPages/ReservationCRUD";
import IdentityCRUD from "../pages/AdminPages/IdentityCRUD";

const Routers = () => {
  return (
    <Routes>   
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />      
      <Route path="*" element={<NotFound />} />
      <Route path="/cars/:id" element={<Rent/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/userDetails" element={<UserDetails/>}/>
      <Route path="/resetPassword/:email/:token" element={<ResetPassword />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/deleteAccount" element={<DeleteAccount />} />
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/admin/categories" element={<CategoryCRUD />} />
      <Route path="/admin/subCategories" element={<SubCategoryCRUD />} />
      <Route path="/admin/vehicles" element={<VehicleCRUD/>} />
      <Route path="/admin/reservations" element={<ReservationCRUD />} />
      <Route path="/admin/identity" element={<IdentityCRUD />} />
    </Routes>
  );
};
export default Routers;