import { useForm, SubmitHandler } from "react-hook-form"
import { register } from "../interface"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller} from "react-hook-form"
import { Button, TextField } from "@mui/material"
import { schema1 } from "../schema"
import { addUser, initDB } from "../database"
import { Link, useNavigate } from "react-router-dom"


const Register = () => {
  const { control, formState: { errors }, handleSubmit } = useForm<register>({ resolver: yupResolver<register>(schema1), mode: 'onChange' })
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<register> = async (data) => {
    await initDB()
    await addUser(data)
    navigate('/login')
    console.log(data);
  }


  return (
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="section">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Last name" margin='dense' error={!!errors.name} helperText={errors.name ? errors.name.message : ''} />}
          />
        </div>
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
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Phone" margin='dense' error={!!errors.phone} helperText={errors.phone ? errors.phone.message : ''} />}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Password" margin='dense' error={!!errors.password} helperText={errors.password ? errors.password.message : ''} />}
          />
          <p>Already Register Please <Link to='/login'>Login</Link></p>
            < Button type="submit" sx={{display : 'block'}} variant="contained" >Submit</Button>
 
        </div>
      </form>
  )
}

export default Register;