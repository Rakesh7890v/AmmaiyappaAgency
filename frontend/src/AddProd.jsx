import React, { useState } from 'react';
import axios from 'axios';

const AddProd = () => {
  const [foods, setFoods] = useState({
    name: '',
    price: '',
    qnt: '',
    image: null,
    type: 'Chocolate',
  });
  axios.defaults.withCredentials = true;
  const [submitMessage, setSubmitMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!foods.name || !foods.price || !foods.qnt || !foods.image) {
      setSubmitMessage('Error: Please fill all fields.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', foods.name);
    formData.append('price', foods.price);
    formData.append('qnt', foods.qnt);
    formData.append('image', foods.image);
    formData.append('type', foods.type);

    axios.post('https://ammaiyappa-api.vercel.app/addfoods', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(result => {
      setFoods({
        name: '',
        price: '',
        qnt: '',
        image: null,
        type: 'Chocolate',
      });
      setSubmitMessage('Successfully Added');
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setSubmitMessage('Error: Failed to add product.');
      setLoading(false);
    });
  };

  return (
    <div>
      {submitMessage && <p className='successsubmit'>{submitMessage}</p>}
      {loading && <p>Loading...</p>}
      <div className="newProd-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Enter Product Name'
            value={foods.name}
            onChange={(e) => setFoods({ ...foods, name: e.target.value })}
          />
          <input
            type="text"
            placeholder='Enter Product Price'
            value={foods.price}
            onChange={(e) => setFoods({ ...foods, price: e.target.value })}
          />
          <input
            type="text"
            placeholder='Enter Product Quantity'
            value={foods.qnt}
            onChange={(e) => setFoods({ ...foods, qnt: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setFoods({ ...foods, image: e.target.files[0] })}
          />
          {foods.image && (
            <img src={URL.createObjectURL(foods.image)} alt="Preview" />
          )}
          <select
            value={foods.type}
            onChange={(e) => setFoods({ ...foods, type: e.target.value })}
          >
            <option value="Chocolate">Chocolates</option>
            <option value="Snack">Snacks</option>
            <option value="Magazines">Magazines</option>
            <option value="Ice-Creams">Ice-Creams</option>
            <option value="Cool-Drinks">Cool-Drinks</option>
            <option value="Essentials">Essentials</option>
          </select>
          <button disabled={loading}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProd;