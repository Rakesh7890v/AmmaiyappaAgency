import AddProd from './AddProd'
import './App.css'
import Products from './Products'
import Header from './Header'
import Login from './Login'
import {Routes, Route} from 'react-router-dom'
import logo from './assets/logo.png';

function App() {
  return (
    <div className='clg-container'>
      <div className="background-logo">
        <img src={logo} alt="main-logo" className='logo-main' />
      </div>
      <Header />
      <Routes >
        <Route path='/' element={<Products />}/>
        <Route path='/addprod' element={<AddProd />}/>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
