import { productStart } from '../interface';
import { CardActions, Card, Box, Grid, CardContent, CardMedia, Button, Typography } from '@mui/material';
import Navbar from './Navbar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch } from "react-redux";
import { add } from '../redux/slices/cartSlice';
import { storeData } from '../storedata'
import toast, { Toaster } from 'react-hot-toast';


const Home = () => {

  const result: productStart[] = storeData
  const dispatch = useDispatch();

  const handleAdd = (data: productStart) => {
    try {
      toast.success('Item added successfully')
      const email1: string | null = localStorage.getItem('email')
      console.log(data)
      console.log(email1)
      dispatch(add({ ...data, quantity: 1, total: data.price }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Box sx={{ flexGrow: 1, marginTop: '100px', }}>
        <Grid container spacing={3} >
          {result?.map((data) => {
            return (
              <Grid item lg={3}>
                <Card sx={{ width: '300px', maxHeight: '450px', textAlign: 'center', backgroundColor: 'aliceblue' }}>
                  <CardMedia
                    component="img"
                    alt=""
                    height="200"
                    image={data.images[0]}
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography gutterBottom component="div">
                      {data.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <CurrencyRupeeIcon />{data.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant='contained' size='medium' sx={{ margin: 'auto' }} onClick={() => handleAdd(data)} >Add to Cart</Button>
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