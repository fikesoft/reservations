import { initiateGoogleAuth } from '../../api/authApi'
import { FcGoogle } from 'react-icons/fc'
import style from "./authBtnGoogle.module.scss"
const AuthGoogleBtn = () => {
    const handleGoogle = () =>{
        initiateGoogleAuth()
    }
    return (
     <button  onClick={handleGoogle} className={style.buttonGoogle}>
      <FcGoogle /> Register with Google
     </button>
  )
}

export default AuthGoogleBtn