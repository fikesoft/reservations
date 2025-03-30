import classNames from "classnames"
import style from "./authManualBtn.module.scss"

  interface AuthManualBtnProps{
    textButton:string,
    typeButton: "submit" | "reset" | "button" | undefined
    handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void; 
    disabled:boolean
  }
const AuthManualBtn:React.FC<AuthManualBtnProps> = ({textButton,typeButton, handleOnClick ,disabled}) => {
  return (
    <button className={classNames(style.buttonAuthManual ,"w-100 ")} type={typeButton} disabled={disabled} onClick={(event) => {
    event.preventDefault()
    handleOnClick(event)}} >
        {textButton}
    </button>
  )
}

export default AuthManualBtn