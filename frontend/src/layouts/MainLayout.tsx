import { Outlet } from "react-router-dom"
import { Header } from "../components"
import styles from "./main-layout.module.scss"
const MainLayout = () => {
  return (
    <div className={styles.main_container}>
      <header>        
        <Header/>
      </header>
        <main style={{color:"black"}}>
          <Outlet/>
        </main>
    </div>
  )
}

export default MainLayout