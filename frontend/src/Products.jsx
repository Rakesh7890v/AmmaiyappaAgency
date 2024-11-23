import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const FoodOrder = () => {
  const [selectedCategory, setSelectedCategory] = useState("Chocolate");
  const [foods, setFoods] = useState([]);
  const [update, setUpdate] = useState(null);
  const [login, setLogin] = useState(false);
  const [buttons, setButtons] = useState(false);
  const [showId, setShowId] = useState(null);

  const fetchFoods = () => {
    axios.get('http://localhost:5000/foods')
      .then(result => {
        setFoods(result.data);
        console.log("OUTPUT:", result.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchFoods();
    const login = JSON.parse(localStorage.getItem("loginpassword"));
    if (login === "sabari") {
      setLogin(true);
    }
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredFoods = foods.filter(food => food.type === selectedCategory);

  const handleShow = (id) => {
    setShowId(id);
    setButtons(true);
  };

  const handleClose = () => {
    setButtons(false);
  };

  const handleUpdate = (id) => {
    const updateFood = foods.find(food => food._id === id);
    setUpdate(updateFood);
  };

  const handleDelete = (id) => {
    axios.post('http://localhost:5000/delete', { id })
      .then(result => {
        console.log(result);
        fetchFoods();
      })
      .catch(err => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdate(prevUpdate => ({
      ...prevUpdate,
      [name]: name === 'image' ? e.target.files[0] : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', update._id);
    formData.append('name', update.name);
    formData.append('price', update.price);
    formData.append('qnt', update.qnt);
    formData.append('image', update.image);
    formData.append('type', update.type);

    axios.post('http://localhost:5000/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(result => {
        console.log(result);
        setUpdate(null);
        fetchFoods();
        handleClose();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="filters">
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="Chocolate">Chocolates</option>
          <option value="Snack">Snacks</option>
          <option value="Magazines">Magazines</option>
          <option value="Ice-Creams">Ice-Creams</option>
          <option value="Cool-Drinks">Cool-Drinks</option>
          <option value="Essentials">Essentials</option>
        </select>
      </div>

      <div className="food-container">
        {filteredFoods.map(food => (
          <div className="foods" key={food._id}>
            <div className="foods-image">
              <div className="prod-image">
                <img src={`http://localhost:5000/${food.image}`} alt={food.name} />
              </div>
            </div>

            {login && (
              <div className="login-access">
                <i className="fas fa-ellipsis-v" onClick={() => handleShow(food._id)}></i>
              </div>
            )}
            {buttons && showId === food._id ? (
              <div className="login-buttons">
                <i className="fas fa-times" onClick={handleClose}></i>
                <button className="update" onClick={() => handleUpdate(food._id)}>Update</button>
                <button className="delete" onClick={() => handleDelete(food._id)}>Delete</button>
              </div>
            ) : null}

            <div className="food-details">
              <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{food.name}</p>
              <p style={{ color: 'rgb(0, 192, 22)', fontWeight: '500' }}>
                <b style={{ color: 'black', fontWeight: '500' }}>Price: </b>${food.price}
              </p>
              <p style={{ color: 'rgb(255, 74, 74)', fontWeight: '500' }}>
                <b style={{ color: 'black', fontWeight: '500' }}>Quantity: </b>{food.qnt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {update && (
        <div className="update-container">
          <form onSubmit={handleFormSubmit}>
            <i className="fas fa-times" onClick={() => setUpdate(null)}></i>
            <input
              type="text"
              name="name"
              value={update.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="price"
              value={update.price}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="qnt"
              value={update.qnt}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
            />
            <select
              name="type"
              value={update.type}
              onChange={handleInputChange}
            >
              <option value="Chocolate">Chocolates</option>
              <option value="Snack">Snacks</option>
            </select>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FoodOrder;