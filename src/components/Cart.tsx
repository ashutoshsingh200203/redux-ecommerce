import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch } from "react-redux";
import { addQuantity, removeQuantity } from "../redux/slices/cartSlice";




const Cart = () => {
  const carts = useSelector((state : RootState )=> state.cart.prod)
  console.log(carts)
  const dispatch = useDispatch()
  return (
    <TableContainer component={Paper}>
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
        {carts.map((item) => (
          <TableRow
            key={item.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <img src={item.image} alt="" height='150px' width='130px' />
            </TableCell>
            <TableCell align="right"><CurrencyRupeeIcon/>{item.price}</TableCell>
            <TableCell align="right">
              
                <TableCell><Button disabled={item.quantity > 0 ? '': true} onClick={()=>dispatch(removeQuantity(item.id))}>-</Button></TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell><Button onClick={()=>dispatch(addQuantity(item.id))}>+</Button></TableCell>
              
            </TableCell>
            <TableCell align="right"><CurrencyRupeeIcon/>{item.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default Cart ;