import { Outlet } from "react-router-dom"
import { Header, Footer } from "../components"
import styles from "./main-layout.module.scss"
import useAppSelector from "../store/hooks/useSelector"
const MainLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return (
    <div className={styles.main_container}>
      <header>        
        <Header/>
      </header>
        <main style={{color:"black"}}>
          <Outlet/>
        </main>
        <footer>
          {isAuthenticated ? 
            <Footer/>
          : ""}

        </footer>
    </div>
  )
}

export default MainLayout