import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import '../../styles/crud.css';

const SubCategoryCrudForm = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [newSubCategoryCategoryId, setNewSubCategoryCategoryId] = useState('');
  const [editSubCategoryId, setEditSubCategoryId] = useState('');
  const [editedSubCategory, setEditedSubCategory] = useState({name: "",  categoryId: ""});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/SubCategory', config);
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubCategory = async () => {
    try {
      await axios.post('/api/SubCategory', { name: newSubCategoryName, categoryId: newSubCategoryCategoryId }, config);
      fetchSubCategories();
      setNewSubCategoryName(''); setNewSubCategoryCategoryId('');
      setSubmissionStatus("success"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } catch (error) {
      console.error('Error adding subcategory:', error);
      setSubmissionStatus("error"); setTimeout(() => {setSubmissionStatus(null)}, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (subCategory) => {
    setEditSubCategoryId(subCategory.id);
    setEditedSubCategory(subCategory);
  };

  const handleEditSubCategory = async (subCategoryId) => {
    try {
      const edited = { id: subCategoryId, name: editedSubCategory.name, categoryId: editedSubCategory.categoryId };
      await axios.put(`/api/SubCategory`, edited, config);
      fetchSubCategories();
      setEditSubCategoryId(null);
    } catch (error) {
      console.error('Error editing subcategory:', error);
    }
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    const confirmed = window.confirm("Jeni të sigurtë që dëshironi ta fshini këtë subkategori?");
    if(confirmed) {
      try {
        await axios.delete('/api/SubCategory', {data: {id: subCategoryId }, headers: { Authorization: `Bearer ${token}`} });
        fetchSubCategories();
      } catch (error) {
        console.error('Error deleting subcategory:', error);
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
          <NavLink exact to="/admin/subcategories" className="px-5 text-black">
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
          value={newSubCategoryName}
          placeholder='Emri i SubKategorisë'
          onChange={(e) => setNewSubCategoryName(e.target.value)}
        />
        <input
          type="text"
          value={newSubCategoryCategoryId}
          placeholder='Id-ja e Kategorisë'
          onChange={(e) => setNewSubCategoryCategoryId(e.target.value)}
        />

        <button className="submit-button" onClick={handleAddSubCategory}>
          Shto SubKategorinë
        </button>

        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3">SubKategorija është shtuar me sukses!</div>
        )}

        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3"> SubKategorija nuk u shtua me sukses! Provo përsëri.</div>
        )}
      </div>

      {loading ? (
        <h4 style={{margin:"70px 10px"}}>Loading subcategories...</h4>
      ) : (
        subCategories.length === 0 ? (
          <h3 style={{margin:"105px 10px"}}> Nuk ekziston ndonjë sub kategori. </h3>
        ) : (
          <ul>
            {subCategories.map((subCategory) => (
              <li key={subCategory.id}>
                <div>
                  {editSubCategoryId === subCategory.id ? (
                    <>
                      <div>
                        <b>Emri: </b>
                        <input
                          type="text"
                          value={editedSubCategory.name}
                          onChange={(e) => setEditedSubCategory({ ...editedSubCategory, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <b>Id-ja e Kategorisë: </b>
                        <input
                          type="text"
                          value={editedSubCategory.categoryId}
                          onChange={(e) => setEditedSubCategory({ ...editedSubCategory, categoryId: e.target.value })}
                        />
                      </div>
                      <div>
                        <button className="submit-button" onClick={() => handleEditSubCategory(subCategory.id)}>
                          Ruaj
                        </button>
                        <button className="aButton" onClick={() => setEditSubCategoryId(null)}>
                          Kthehu
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div> <b>Id: </b> {subCategory.id} </div> 
                      <div> <b>Emri: </b> {subCategory.name} </div>
                      <div> <b>Id-ja e Kategorisë: </b> {subCategory.categoryId} </div>  

                      <div>
                        <button className="aButton" onClick={() => handleStartEdit(subCategory)}>
                          Edito
                        </button>
                        <button className="submit-button" onClick={() => handleDeleteSubCategory(subCategory.id)}>
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

export default SubCategoryCrudForm;
