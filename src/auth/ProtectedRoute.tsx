import {RootState } from '../redux/store';
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"


const ProtectedRoute = ({children}) => {
  const auth = useSelector((state : RootState) => state.auth);
  let location = useLocation();

  if(!auth.authenticated) {
      return <Navigate to="/login" state={{ from: location}} replace />
  }
return children

};

export default ProtectedRoute;