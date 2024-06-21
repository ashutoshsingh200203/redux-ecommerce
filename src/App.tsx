import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import Notfound from './components/Notfound'
import Login from './components/Login'
import Register from './components/Register'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import './App.css'


function App() {

  const authes = useSelector((state : RootState)=> state.auth)
  console.log(authes)
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/cart' element={<Cart/>} ></Route>
        <Route path='*' element={<Notfound />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
