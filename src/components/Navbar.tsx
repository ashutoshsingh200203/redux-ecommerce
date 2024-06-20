import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeAuth } from '../redux/slices/authSlice';





const Navbar = () => {
  const dispatch = useDispatch()
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ecommerce
        </Typography>
       <Link to='/cart' ><ShoppingCartIcon sx={{color : 'white'}} /></Link> 
       <Button variant='contained' color='error' onClick={()=>dispatch(removeAuth())}>Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar
