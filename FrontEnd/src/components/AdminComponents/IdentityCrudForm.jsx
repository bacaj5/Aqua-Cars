import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import '../../styles/crud.css';

const IdentityCrudForm = () => {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState('');        
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const [editUserId, setEditUserId] = useState('');
  const [editedUser, setEditedUser] = useState({username: "",  email: "",  password: "", roles: [""] });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/identity/getAllUsersDetails', config);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching newEmail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      const data = { username: newUsername, email: newEmail, password: newPassword, confirmPassword: newConfirmPassword };
      await axios.post("/api/identity/register", data);

      fetchUserDetails();
      setNewUsername(''); setNewEmail(''); setNewPassword(''); setNewConfirmPassword('');
      setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } catch (error) {
      console.error('Error adding identity:', error);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    }
  };

  const handleStartEdit = (user) => {
    setEditUserId(user.id);
    setEditedUser({
      username: user.username,
      email: user.email,
      password: user.password,
      roles: user.roles.join(", ")
    });
  };

  const handleEditUser = async (userId) => {
    try {
      const edited = { id: userId, userName: editedUser.username, email: editedUser.email, password: editedUser.password, roles: editedUser.roles.split(",") };
      await axios.put(`/api/identity/EditUser`, edited, config);
      fetchUserDetails();
      setEditUserId(null);
    } catch (error) {
      console.error('Error editing identity:', error);
    }
  };

  const handleDeleteUser = async (userEmail) => {
    const confirmed = window.confirm("Jeni të sigurtë që dëshironi ta fshini këtë përdorues?");
    if(confirmed) {
      try {
          await axios.delete('/api/identity/DeleteUserByEmail', {headers: { Authorization: `Bearer ${token}` }, params: { email: userEmail } });
            fetchUserDetails();
      } catch (error) {
        console.error('Error deleting identity:', error);
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
          <NavLink exact to="/admin/vehicles" className="px-5">
            <b> Veturat </b>
          </NavLink>
          <NavLink exact to="/admin/reservations" className="px-5">
            <b> Rezervimet </b>
          </NavLink>
          <NavLink exact to="/admin/identity" className="px-5 text-black">
            <b> Përdoruesit </b>
          </NavLink>
        </li>
      </div>
    
      <div className="add-form">
        <input
          type="text"
          value={newUsername}
          placeholder='Emri'
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <input
          type="text"
          value={newEmail}
          placeholder='E-Mail'
          onChange={(e) => setNewEmail(e.target.value)}
        />

        <input
          type="text"
          value={newPassword}
          placeholder='FjalëKalimi'
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="text"
          value={newConfirmPassword}
          placeholder='Konfirmo FjalëKalimin'
          onChange={(e) => setNewConfirmPassword(e.target.value)}
        />

        <button className="submit-button" onClick={handleAddUser}>
          Shto Përdoruesin
        </button>

        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3"> Përdoruesi është shtuar me sukses! </div>
        )}

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3"> Përdoruesi nuk u shtua me sukses! Provo përsëri.</div>
        )}
      </div>

      {loading ? (
        <h4 style={{margin:"70px 10px"}}>Loading users...</h4>
      ) : (
        users.length === 0 ? (
        <h3 style={{margin:"105px 10px"}}> Nuk ekziston ndonjë përdorues. </h3>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <div>
                  {editUserId === user.id ? (
                    <>
                      <div>
                        <b>Emri: </b>
                        <input
                          type="text"
                          value={editedUser.username}
                          onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                        />
                      </div>

                      <div>
                        <b>E-Mail: </b>
                        <input
                          type="text"
                          value={editedUser.email}
                          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <b>FjalëKalimi: </b>
                        <input
                          type="text"
                          value={editedUser.password}
                          onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <b>Roli: </b>
                        <input
                          type="text"
                          value={editedUser.roles}
                          onChange={(e) => setEditedUser({ ...editedUser, roles: e.target.value })}
                        />
                      </div>

                      <div>
                        <button className="submit-button" onClick={() => handleEditUser(user.id)}>
                          Ruaj
                        </button>
                        <button className="aButton" onClick={() => setEditUserId(null)}>
                          Kthehu
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div> <b>Emri: </b> {user.username} </div>
                      <div> <b>E-Mail: </b> {user.email} </div>  
                      <div style={{backgroundColor: "#bbd4ef"}}> <b>Fjalëkalimi: --Ruhen të drejtat e përdoruesit-- </b> </div>  
                      <b>Roli: </b> {user.roles.join(", ")}

                      <div>
                        <button className="aButton" onClick={() => handleStartEdit(user)}>
                          Edito
                        </button>
                        <button className="submit-button" onClick={() => handleDeleteUser(user.email)}>
                          Fshij
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default IdentityCrudForm;
