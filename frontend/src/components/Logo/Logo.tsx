import logo from "../../assets/img/logo.png"
import { useNavigate } from "react-router-dom"
const Logo = () => {
  const navigate = useNavigate();
  return (
    <div >
        <img src={logo} alt="logo" style={{maxWidth:"50px", height:"auto", cursor:"pointer"}} onClick={()=>{navigate("/home")}} />
    </div>
  )
}

export default Logo