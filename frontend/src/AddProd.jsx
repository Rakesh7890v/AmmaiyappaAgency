import React, { useEffect, useState } from 'react';
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
  const [submitMessage, setSubmitMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append('name', foods.name);
    formData.append('price', foods.price);
    formData.append('qnt', foods.qnt);
    formData.append('image', foods.image);
    formData.append('type', foods.type);

    axios.post('https://ammaiyappa-api.vercel.app/foods', formData, {
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
      setSubmitMessage(true);
      setTimeout(() => {
        setSubmitMessage(false);
      },2000);
      console.log(result)}
    )
    .catch(err => console.log(err));
  };

  return (
    <div>
    {submitMessage && <p className='successsubmit'>Sucessfully Added</p>}
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
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProd;
