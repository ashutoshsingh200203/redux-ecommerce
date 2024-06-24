import { useForm, SubmitHandler } from "react-hook-form"
import { login } from "../interface"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller } from "react-hook-form"
import { Box, Button, TextField } from "@mui/material"
import { schema2 } from "../schema"
import { getProducts, getUser, initDB } from "../database"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAuth } from "../redux/slices/authSlice"
import { setStart } from "../redux/slices/cartSlice"
import { useEffect } from "react"

const Login = () => {
  const { control, formState: { errors }, handleSubmit } = useForm<login>({ resolver: yupResolver<login>(schema2), mode: 'onChange' })
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const onSubmit: SubmitHandler<login> = async (data) => {
    await initDB()
    let result = await getUser(data.email)
    if (result) {
      if (result.password === data.password) {
        console.log("Login successfully")
        localStorage.setItem('email', `${result.email}`)
        dispatch(setAuth())
        await initDB()
        const newdata = await getProducts(result.email)

        console.log(newdata)
        if (newdata) {
          dispatch(setStart(newdata.product))
        }
        if(history.length <= 2)
        {
            navigate('/')
        }
        else{
          history.back()
        }
        console.log(history.length)
      }
      else {
        console.log("Invalid username or password")
      }
    }
    else {
      console.log("invalid email or password")
    }
    console.log(result);
  }
 
  return (
    <Box
      height='auto'
      width='600px'
      marginLeft='450px'
      marginTop='180px'
      p={3}
      sx={{ border: '2px solid grey' }}
    >
      <h2 style={{ textAlign: 'center' }}>Login Here</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }} >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Enter your email" margin='dense' error={!!errors.email} helperText={errors.email ? errors.email.message : ''} />}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Enter your password" margin='dense' error={!!errors.password} helperText={errors.password ? errors.password.message : ''} />}
        />
        <p style={{ textAlign: 'center' }}>Not registered yet Please <Link to='/register' replace>Register</Link> first !!</p>
        < Button type="submit" sx={{ display: 'block' }} variant="contained" >Login</Button>
      </form>
    </Box>
  )
}

export default Login;