import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, Box, TableHead, TableRow, Typography, CardActions } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch } from "react-redux";
import { addQuantity, removeQuantity, setStart } from "../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { deleteProducts, initDB } from "../database";
import Navbar from "./Navbar";



const Cart = () => {
  const carts = useSelector((state: RootState) => state.cart.prod)
  console.log(carts)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleCheckout = async() => {
    const ema = localStorage.getItem('email') as string
    localStorage.removeItem('persist:root')
    dispatch(setStart([]))
    //  await initDB()
    //  await deleteProducts(ema)
  }


  return (
    <div className="carts">
      <Navbar/>
      <TableContainer sx={{ width: '70%' }}>
        <Table sx={{ width: '60%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.length > 0 && carts.map((item) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <img src={item.images[0]} alt="" height='150px' width='130px' />
                </TableCell>
                <TableCell align="right"><p style={{ fontSize: '20px' }}><CurrencyRupeeIcon />{item.price}</p></TableCell>
                <TableCell align="right">
                  <TableCell><Button disabled={item.quantity > 0 ? '' : true} onClick={() => dispatch(removeQuantity(item.id))}>-</Button></TableCell>
                  <TableCell><p style={{ fontSize: '20px' }}>{item.quantity}</p></TableCell>
                  <TableCell><Button onClick={() => dispatch(addQuantity(item.id))}>+</Button></TableCell>
                </TableCell>
                <TableCell align="right"><p style={{ fontSize: '20px' }}><CurrencyRupeeIcon />{item.total}</p></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ display: "flex", justifyContent: 'space-evenly', padding: '20px', marginTop: '15px' }}>
          <Link to='/'>  <Button variant="contained" >Add more</Button> </Link>
        </div>
      </TableContainer>

      {carts.length>0 &&
      <div className="checkout">
        <Table aria-label="simple table">
          <TableBody>
            <Typography variant="h5" sx={{textAlign:'center'}} gutterBottom>
              Checkout
            </Typography>
            {carts.length > 0 && carts.map((item) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell  >{item.title}</TableCell>
                <TableCell align="right">{item.price}x{item.quantity}</TableCell>
                <TableCell align="right">{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link to='/checkout'>  <Button variant="contained" sx={{ float: 'right', marginTop: '15px' }} onClick={()=>handleCheckout()} >Checkout</Button> </Link>
      </div>}

    </div>
  )
}

export default Cart;