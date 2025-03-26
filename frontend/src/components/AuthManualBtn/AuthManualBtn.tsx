import classNames from "classnames"
import style from "./authManualBtn.module.scss"

  interface AuthManualBtnProps{
    textButton:string,
    typeButton: "submit" | "reset" | "button" | undefined
 }
const AuthManualBtn:React.FC<AuthManualBtnProps> = ({textButton,typeButton }) => {
  return (
    <button className={classNames(style.buttonAuthManual ,"w-100 ")} type={typeButton}>
        {textButton}
    </button>
  )
}

export default AuthManualBtn