import { useForm, SubmitHandler } from "react-hook-form"
import { register } from "../interface"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller} from "react-hook-form"
import { Button, TextField } from "@mui/material"
import { schema2 } from "../schema"
import { getProducts, getUser, initDB } from "../database"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAuth } from "../redux/slices/authSlice"
import { setStart } from "../redux/slices/cartSlice"




const Login = () => {
  const { control, formState: { errors }, handleSubmit } = useForm<register>({ resolver: yupResolver<register>(schema2), mode: 'onChange' })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<register> = async (data) => {
    await initDB()
    let result = await getUser(data.email)
    if(result)
    {
          if(result.password === data.password)
          { 
            console.log("Login successfully")
            localStorage.setItem('email',`${result.email}`)
            dispatch(setAuth())
            await initDB()
            const newdata = await getProducts(result.email)

            console.log(newdata)
            if(newdata)
            { 
                dispatch(setStart(newdata.product))
            }
            navigate('/')
          }
          else{
            console.log("Invalid username or password")
          }
    }
    else{
      console.log("invalid email or password")
    }
    console.log(result);
  }


  return (
      <form onSubmit={handleSubmit(onSubmit)} >

        <div className="section">

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Email" margin='dense' error={!!errors.email} helperText={errors.email ? errors.email.message : ''} />}
          />
        </div>

        <div className="section">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Password" margin='dense' error={!!errors.password} helperText={errors.password ? errors.password.message : ''} />}
          />

          <p>Not registered yet Please <Link to='/register'>Register</Link> first !!</p>
            < Button type="submit" sx={{display : 'block'}} variant="contained" >Login</Button>
 
        </div>
      </form>
  )
}

export default Login;