import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { handleGoogleCallback } from '../../api/authApi';
import useAppDispatch from '../../store/hooks/useDispach';
import { login } from '../../store/slices/userSlice'; 
import { JwtPayload } from "jsonwebtoken"; 
import { useNavigate } from 'react-router-dom';
interface User {
  name: string;
  email: string;
  picture:string | null ;
}

const Callback = () => {
  const dispatch = useAppDispatch(); 
  const navigate = useNavigate()
  useEffect(() => {
    const processCallback = async () => {
      const userData: JwtPayload | null = await handleGoogleCallback(); // handleGoogleCallback returns JwtPayload
      if (userData ) {
        const user: User = {
          name: userData.name as string,
          email: userData.email as string,
          picture : userData.picture as string
        };

        dispatch(login({ user, role: "user" })); // Dispatch correctly'
        navigate("/home")
      }
    };

    processCallback();
  }, [dispatch]); // Add dispatch to dependency array

  return (
    <div>
      <h1>Preparing to log in</h1>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default Callback;
