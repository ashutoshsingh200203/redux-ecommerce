import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { Badge, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeAuth } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { products } from '../interface';
import { addProducts, initDB, updateProducts } from '../database';

const Navbar = () => {
  const dispatch = useDispatch();
  const carts : products[] = useSelector((state : RootState )=> state.cart.prod)
  const navigate : NavigateFunction = useNavigate()

  const handleLogout = async () =>{
    console.log("ashu")
    dispatch(removeAuth())
    await initDB() ;
    const email1 : string | null= localStorage.getItem('email')
    const newdata = {email : email1 , product : carts}

    const variable : number = await addProducts(newdata)
    if(variable === -1)
    {
      await updateProducts(newdata)   
    }
    console.log('vijay')
    localStorage.removeItem('persist:root')
    localStorage.removeItem('email')
    navigate('/login')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" sx={{backgroundColor : 'lightsteelblue'}} >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 , marginLeft: '35px', fontSize:'30px' , color: 'blueviolet' }}>
          Shopify
        </Typography>
      <div style={{marginRight: '30px'}}> <Badge color='secondary' badgeContent={carts.length} > <Link to='/cart' ><ShoppingCartIcon sx={{color : 'white' , fontSize:'35px'}} /></Link> </Badge></div>
       <Button variant='contained' color='error' onClick={()=>handleLogout()}>Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar
