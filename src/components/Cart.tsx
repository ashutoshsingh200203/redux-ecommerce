import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch } from "react-redux";
import { addQuantity, removeQuantity } from "../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";



const Cart = () => {
  const carts = useSelector((state : RootState )=> state.cart.prod)
  console.log(carts)
  const dispatch = useDispatch()
  const navigate = useNavigate() ;

  const handleCheckout = () =>{
    const ls : string | null = localStorage.getItem('email') ;
    if(ls){
     navigate('/checkout')
    }
    else{
      navigate('/login')
    }
  }

  return (
    <TableContainer >
    <Table sx={{ width: '50%' , margin : 'auto' }} aria-label="simple table">
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
          <TableRow
            key={item.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <img src={item.images[0]} alt="" height='150px' width='130px' />
            </TableCell>
            <TableCell align="right"><p style={{fontSize:'20px'}}><CurrencyRupeeIcon/>{item.price}</p></TableCell>
            <TableCell align="right">
              
                <TableCell><Button disabled={item.quantity > 0 ? '': true} onClick={()=>dispatch(removeQuantity(item.id))}>-</Button></TableCell>
                <TableCell><p style={{fontSize:'20px'}}>{item.quantity}</p></TableCell>
                <TableCell><Button onClick={()=>dispatch(addQuantity(item.id))}>+</Button></TableCell>
            </TableCell>
            <TableCell align="right"><p style={{fontSize:'20px'}}><CurrencyRupeeIcon/>{item.total}</p></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div style={{display : "flex" , justifyContent : 'space-evenly' , padding : '20px'  ,  marginTop : '15px'}}>
    <Link to='/'>  <Button variant="contained" >Add more</Button> </Link>
    <Button variant="contained" color="success" onClick={()=>{handleCheckout()}}>Checkout</Button>
    </div>
  </TableContainer>
  )
}

export default Cart ;