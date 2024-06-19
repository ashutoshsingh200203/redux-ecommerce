import axios from 'axios';
import { useEffect, useState } from 'react';
import { products } from '../interface';
import {CardActions,Card,Box,Grid,CardContent,CardMedia , Button, Typography } from '@mui/material';
import Navbar from './Navbar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from '../redux/slices/cartSlice';


const Home = () => {
  const [result, setResult] = useState<products[]>()
  const dispatch = useDispatch() ;
  const getAllProducts = async () => {
    try {
      let url: string = `https://fakestoreapi.com/products`
      let res = await axios.get(url)
      setResult(res.data)
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  // const addCart = () =>{
  //     dispatch(add(result))
  // }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div>
      <Navbar/>
      <Box sx={{ flexGrow: 1 , marginTop: '100px' ,padding:'15px'}}>
        <Grid container >
          {result?.map((data) => {
            return (
              <Grid item xs={4}>
                <Card sx={{ width: 400   , textAlign : 'center' }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={data.image}
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography gutterBottom  component="div">
                      {data.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <sup><CurrencyRupeeIcon/></sup>{data.price}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                      {data.description}
                    </Typography> */}
                  </CardContent>
                  <CardActions>
                    <Button variant='contained' size='medium' onClick={()=>dispatch(add(data))} >Add to Cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
  )
}


export default Home;