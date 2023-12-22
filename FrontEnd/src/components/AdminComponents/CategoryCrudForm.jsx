import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import '../../styles/crud.css';

const CategoryCrudForm = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState('');
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/Category', config);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post('/api/Category', { name: newCategoryName }, config);
      fetchCategories();
      setNewCategoryName('');
      setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } catch (error) {
      console.error('Error adding category:', error);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    }
  };

  const handleStartEdit = (categoryId, categoryName) => {
    setEditCategoryId(categoryId);
    setEditedCategoryName(categoryName);
  };

  const handleEditCategory = async (categoryId) => {
    try {
      await axios.put(`/api/Category`, { id: categoryId, name: editedCategoryName }, config);
      fetchCategories();
      setEditCategoryId(null);
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm("Jeni të sigurtë që dëshironi ta fshini këtë kategori?");
    if(confirmed) {
      try {
        await axios.delete(`/api/Category`, {data: {id: categoryId }, headers: { Authorization: `Bearer ${token}`} });
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };
  
  return (
    <div className="crud-container">
      
      <div className='list-unstyled'>
        <li>
          <NavLink exact to="/admin/categories"  className="px-5 text-black"> 
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
          <NavLink exact to="/admin/identity" className="px-5">
            <b> Përdoruesit </b>
          </NavLink>
        </li>
      </div>

      <div className="add-form">
        <input
          type="text"
          value={newCategoryName}
          placeholder='Emri i Kategorisë'
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button className="submit-button" onClick={handleAddCategory}>
          Shto Kategorinë
        </button>

        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3"> Kategoria është shtuar me sukses! </div>
        )}

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3"> Kategoria nuk u shtua me sukses! Provo përsëri. </div>
        )}
      </div>

      {loading ? (
        <h4 style={{margin:"70px 10px"}}>Loading categories...</h4>
      ) : (
        categories.length === 0 ? (
        <h3 style={{margin:"105px 10px"}}> Nuk ekziston ndonjë kategori. </h3>
        ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <div>
                {editCategoryId === category.id ? (
                  <>
                    <div>
                      <b>Emri i Kategorisë: </b>
                      <input
                        type="text"
                        value={editedCategoryName}
                        onChange={(e) => setEditedCategoryName(e.target.value)}
                      />
                    </div>
                    <div>
                      <button className="submit-button" onClick={() => handleEditCategory(category.id)}>
                        Ruaj
                      </button>
                      <button className="aButton" onClick={() => setEditCategoryId(null)}>
                        Kthehu
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div> <b>Id: </b> {category.id} </div>
                    <div> <b>Emri: </b> {category.name} </div>
                    <div>
                      <button className="aButton" onClick={() => handleStartEdit(category.id, category.name)}>
                        Edito
                      </button>
                      <button className="submit-button" onClick={() => handleDeleteCategory(category.id)}>
                        Fshij
                      </button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default CategoryCrudForm;
