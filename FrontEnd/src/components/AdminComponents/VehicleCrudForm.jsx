import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../../styles/crud.css";

const VehicleCrudForm = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicleModel, setNewVehicleModel] = useState("");
  const [newVehicleSubCategoryId, setNewVehicleSubCategoryId] = useState("");
  const [newVehicleKilometersPerHour, setNewVehicleKilometersPerHour] = useState("");
  const [newVehicleProdYear, setNewVehicleProdYear] = useState("");
  const [newVehicleEngine, setNewVehicleEngine] = useState("");
  const [newVehicleSeatingCapacity, setNewVehicleSeatingCapacity] = useState("");
  const [newVehicleDescription, setNewVehicleDescription] = useState("");
  const [newVehiclePricePerDay, setNewVehiclePricePerDay] = useState("");
  const [newVehiclePhoto, setNewVehiclePhoto] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editVehicleId, setEditVehicleId] = useState(null);
  const [editedVehicle, setEditedVehicle] = useState({
    model: "",  subCategoryId: "", kilometersPerHour: "", prodYear: "", engine: "",
    seatingCapacity: "", description: "", pricePerDay: "", photo: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/Vehicle");
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async () => {
    try {
      const formData = new FormData();
      formData.append("model", newVehicleModel);
      formData.append("subCategoryId", newVehicleSubCategoryId);
      formData.append("kilometersPerHour", newVehicleKilometersPerHour);
      formData.append("prodYear", newVehicleProdYear);
      formData.append("engine", newVehicleEngine);
      formData.append("seatingCapacity", newVehicleSeatingCapacity);
      formData.append("description", newVehicleDescription);
      formData.append("pricePerDay", newVehiclePricePerDay);
      formData.append("photo", newVehiclePhoto);

      await axios.post("/api/Vehicle", formData, { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }} );

      fetchVehicles();
      setNewVehicleModel(""); setNewVehicleSubCategoryId(""); setNewVehicleKilometersPerHour(""); setNewVehicleProdYear("");
      setNewVehicleEngine(""); setNewVehicleSeatingCapacity(""); setNewVehicleDescription(""); setNewVehiclePricePerDay("");
      setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } catch (error) {
      console.error("Error adding vehicle:", error);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    }
  };

  const handleStartEdit = (vehicle) => {
    setEditVehicleId(vehicle.id);
    setEditedVehicle(vehicle);
  };

  const handleEditVehicle = async () => {
    try {
      const formData = new FormData();
      formData.append("id", editVehicleId);
      formData.append("model", editedVehicle.model);
      formData.append("subCategoryId", editedVehicle.subCategoryId);
      formData.append("kilometersPerHour", editedVehicle.kilometersPerHour);
      formData.append("prodYear", editedVehicle.prodYear);
      formData.append("engine", editedVehicle.engine);
      formData.append("seatingCapacity", editedVehicle.seatingCapacity);
      formData.append("description", editedVehicle.description);
      formData.append("pricePerDay", editedVehicle.pricePerDay);
      formData.append("photo", editedVehicle.photo);

      await axios.put(`/api/Vehicle`, formData, { headers: { "Content-Type": "multipart/form-data",  Authorization: `Bearer ${token}` }} );

      fetchVehicles();
      setEditVehicleId(null);
    } catch (error) {
      console.error("Error editing vehicle:", error);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    const confirmed = window.confirm("Jeni të sigurtë që dëshironi ta fshini këtë veturë?");
    if(confirmed) {
      try {
        await axios.delete(`/api/Vehicle`, {data: {id: vehicleId }, headers: { Authorization: `Bearer ${token}`} });
        fetchVehicles();
      } catch (error) {
        console.error("Error deleting vehicle:", error);
      }
    }
  };

  return (
    <div className="crud-container">

      <div className='list-unstyled'>
        <li>
          <NavLink exact to="/admin/categories" className="px-5"> 
            <b> Kategoritë </b>
          </NavLink>
          <NavLink exact to="/admin/subcategories" className="px-5">
            <b> SubKategoritë </b>
          </NavLink>
          <NavLink exact to="/admin/vehicles" className="px-5 text-black">
            <b> Veturat </b>
          </NavLink>
          <NavLink exact to="/admin/reservations" className="px-5">
            <b> Rezervimet </b>
          </NavLink>
          <NavLink exact to="/admin/identity" className="px-5">
            <b> Përdoruesit </b>
          </NavLink>
        </li>
      </div>

      <div className="add-form">
        <input
          type="text"
          value={newVehicleModel}
          placeholder="Modeli"
          onChange={(e) => setNewVehicleModel(e.target.value)}
        />

        <input
          type="text"
          value={newVehicleSubCategoryId}
          placeholder="Id-ja e SubKategorisë"
          onChange={(e) => setNewVehicleSubCategoryId(e.target.value)}
        />

        <input
          type="text"
          value={newVehicleKilometersPerHour}
          placeholder="Km/Orë"
          onChange={(e) => setNewVehicleKilometersPerHour(e.target.value)}
        />

        <input
          type="text"
          value={newVehicleProdYear}
          placeholder="Viti i Prodhimit"
          onChange={(e) => setNewVehicleProdYear(parseInt(e.target.value))}
        />

        <input
          type="text"
          value={newVehicleEngine}
          placeholder="Motorri"
          onChange={(e) => setNewVehicleEngine(e.target.value)}
        />

        <input
          type="text"
          value={newVehicleSeatingCapacity}
          placeholder="Kapaciteti"
          onChange={(e) =>
            setNewVehicleSeatingCapacity(parseInt(e.target.value))
          }
        />

        <input
          type="text"
          value={newVehicleDescription}
          placeholder="Përshkrimi"
          onChange={(e) => setNewVehicleDescription(e.target.value)}
        />

        <input
          type="text"
          value={newVehiclePricePerDay}
          placeholder="Çmimi/Një Ditë"
          onChange={(e) => setNewVehiclePricePerDay(parseFloat(e.target.value))}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewVehiclePhoto(e.target.files[0])}
        />

        <button className="submit-button" onClick={handleAddVehicle}>
          Shto Veturën
        </button>

        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3"> Vetura është shtuar me sukses!</div>
        )}

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3"> Vetura nuk u shtua me sukses! Provo përsëri.</div>
        )}
      </div>

      {loading ? (
        <h4 style={{margin:"70px 10px"}}>Loading vehicles...</h4>
      ) : (
        vehicles.length === 0 ? (
          <h3 style={{margin:"105px 10px"}}> Nuk ekziston ndonjë veturë. </h3>
        ) : (
          <ul>
            {vehicles.map((vehicle) => (
              <li key={vehicle.id}>
                {editVehicleId === vehicle.id ? (
                  <>
                    <div>
                      <b>Fotoja: </b>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEditedVehicle({ ...editedVehicle, photo: e.target.files[0] })}
                      />
                    </div>

                    <div>
                      <b>Modeli: </b>
                      <input
                        type="text"
                        value={editedVehicle.model}
                        onChange={(e) => setEditedVehicle({ ...editedVehicle, model: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>Id-ja e SubKategorisë: </b>
                      <input
                        type="text"
                        placeholder="Sub Category ID"
                        value={editedVehicle.subCategoryId}
                        onChange={(e) => setEditedVehicle({ ...editedVehicle, subCategoryId: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>Km/Orë: </b>
                      <input
                        type="text"
                        value={editedVehicle.kilometersPerHour}
                        onChange={(e) => setEditedVehicle({...editedVehicle, kilometersPerHour: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>Viti i Prodhimit: </b>
                      <input
                        type="text"
                        value={editedVehicle.prodYear}
                        onChange={(e) => setEditedVehicle({...editedVehicle, prodYear: parseInt(e.target.value) })}
                      />
                    </div>

                    <div>
                      <b>Motorri: </b>
                      <input
                        type="text"
                        value={editedVehicle.engine}
                        onChange={(e) => setEditedVehicle({ ...editedVehicle, engine: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>Kapaciteti: </b>
                      <input
                        type="text"
                        value={editedVehicle.seatingCapacity}
                        onChange={(e) => setEditedVehicle({ ...editedVehicle, seatingCapacity: parseInt(e.target.value) })}
                      />
                    </div>

                    <div>
                      <b>Përshkrimi: </b>
                      <input
                        type="text"
                        value={editedVehicle.description}
                        onChange={(e) => setEditedVehicle({ ...editedVehicle, description: e.target.value })}
                      />
                    </div>

                    <div>
                      <b>Çmimi për një Ditë: </b>
                      <input
                        type="text"
                        value={editedVehicle.pricePerDay}
                        onChange={(e) => setEditedVehicle({ ...editedVehicle, pricePerDay: parseFloat(e.target.value) })}
                      />
                    </div>

                    <button className="submit-button" onClick={handleEditVehicle}>
                      Ruaj
                    </button>

                    <button className="aButton" onClick={() => setEditVehicleId(null)}>
                      Kthehu
                    </button>
                  </>
                ) : (
                  <>
                    <div> <img src={`${vehicle.photoFilePath}`} alt="Car" className="w-50" /> </div>
                    <div> <b>Id: </b> {vehicle.id} </div>
                    <div> <b>Modeli: </b> {vehicle.model} </div>
                    <div> <b>Tipi: </b> {vehicle.subCategoryName} </div>
                    <div> <b>Kilometrat në Orë: </b> {vehicle.kilometersPerHour} </div>
                    <div> <b>Viti i Prodhimit: </b> {vehicle.prodYear} </div>
                    <div> <b>Motorri: </b> {vehicle.engine} </div>
                    <div> <b>Kapaciteti i Ulëseve: </b> {vehicle.seatingCapacity} </div>
                    <div> <b>Përshkrimi: </b> {vehicle.description} </div>
                    <div> <b>Çmimi për një Ditë: </b> €{vehicle.pricePerDay}.00 </div>

                    <div className="button-container">
                      <button className="aButton" onClick={() => handleStartEdit(vehicle)} >
                        Edito
                      </button>

                      <button className="submit-button" onClick={() => handleDeleteVehicle(vehicle.id)} >
                        Fshij
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default VehicleCrudForm;
