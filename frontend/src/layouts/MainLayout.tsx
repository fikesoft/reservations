import { Outlet } from "react-router-dom"
const MainLayout = () => {
  return (
    <div className="main-container">
        <header>Navbar</header>
        <main><Outlet/></main>
    </div>
  )
}

export default MainLayout