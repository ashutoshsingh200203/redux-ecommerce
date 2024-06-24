import {Navigate, useLocation} from "react-router-dom"


const LoginProtection = ({children}:{children : React.JSX.Element}) => {
  // const auth = useSelector((state : RootState) => state.auth);
  const res = localStorage.getItem('email')
  let location = useLocation();

  if(res) {
      return <Navigate to="/" state={{ from: location}} replace />
  }
return children

};

export default LoginProtection;