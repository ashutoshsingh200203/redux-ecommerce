import { productStart } from '../interface';
import {CardActions,Card,Box,Grid,CardContent,CardMedia , Button, Typography } from '@mui/material';
import Navbar from './Navbar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch } from "react-redux";
import { add } from '../redux/slices/cartSlice';
import {storeData} from '../storedata'


const Home = () => {

  const result : productStart[] = storeData
  const dispatch = useDispatch() ;

  return (
    <div>
      <Navbar/>
      <Box sx={{ flexGrow: 1 , marginTop: '100px' ,}}>
        <Grid container spacing={3} >
          {result?.map((data) => {
            return (
              <Grid item lg={3}>
                <Card sx={{ width: '300px' , maxHeight:'450px', textAlign : 'center', backgroundColor :'aliceblue' }}>
                  <CardMedia
                    component="img"
                    alt=""
                    height="200"
                    image={data.images[0]}
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography gutterBottom  component="div">
                      {data.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <CurrencyRupeeIcon/>{data.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant='contained' size='medium' sx={{margin:'auto'}} onClick={()=>dispatch(add({...data , quantity : 1 , total : data.price}))} >Add to Cart</Button>
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