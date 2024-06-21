import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { Badge, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeAuth } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state : RootState )=> state.cart.prod)
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" sx={{backgroundColor : 'lightsteelblue'}} >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 , marginLeft: '35px', fontSize:'30px' , color: 'blueviolet' }}>
          Shopify
        </Typography>
      <div style={{marginRight: '30px'}}> <Badge color='secondary' badgeContent={carts.length} > <Link to='/cart' ><ShoppingCartIcon sx={{color : 'white' , fontSize:'35px'}} /></Link> </Badge></div>
       <Button variant='contained' color='error' onClick={()=>dispatch(removeAuth())}>Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar
