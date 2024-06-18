import { useForm, SubmitHandler } from "react-hook-form"
import { register } from "../interface"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller} from "react-hook-form"
import { Button, TextField } from "@mui/material"
import { schema2 } from "../schema"
import { getUser, initDB } from "../database"



const Login = () => {
  const { control, formState: { errors }, handleSubmit } = useForm<register>({ resolver: yupResolver<register>(schema2), mode: 'onChange' })
  
  const onSubmit: SubmitHandler<register> = async (data) => {
    await initDB()
    let result = await getUser(data.email)
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
            < Button type="submit"  variant="contained" >Login</Button>
 
        </div>
      </form>
  )
}

export default Login;