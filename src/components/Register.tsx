import { useForm, SubmitHandler } from "react-hook-form"
import { register } from "../interface"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller } from "react-hook-form"
import { Button, TextField, Box } from "@mui/material"
import { schema1 } from "../schema"
import { addUser, initDB } from "../database"
import { Link } from "react-router-dom"


const Register = () => {
  const { control, formState: { errors }, handleSubmit } = useForm<register>({ resolver: yupResolver<register>(schema1), mode: 'onChange' })
  const onSubmit: SubmitHandler<register> = async (data) => {
    await initDB()
    await addUser(data)
    history.back()
    console.log(data);
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
      <h2 style={{textAlign : 'center'}}>Register Yourself</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{display : 'flex' , flexDirection : 'column'}} >
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Enter you name" margin='dense' error={!!errors.name} helperText={errors.name ? errors.name.message : ''} />}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Enter your email" margin='dense' error={!!errors.email} helperText={errors.email ? errors.email.message : ''} />}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Enter your phone number" margin='dense' error={!!errors.phone} helperText={errors.phone ? errors.phone.message : ''} />}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Enter  your password" margin='dense' error={!!errors.password} helperText={errors.password ? errors.password.message : ''} />}
          />
          <p style={{textAlign:'center'}}>Already Register Please <Link to='/login' replace>Login</Link></p>
          < Button type="submit" sx={{ display: 'block' }} variant="contained" >Submit</Button>

      </form>
    </Box>
  )
}

export default Register;