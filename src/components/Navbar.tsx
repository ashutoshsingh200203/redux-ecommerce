import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';



const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ecommerce
        </Typography>
       <Link to='/cart' ><ShoppingCartIcon sx={{color : 'white'}} /></Link> 
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar
