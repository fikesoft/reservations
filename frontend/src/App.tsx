import { createBrowserRouter,RouterProvider } from "react-router-dom"
//Import layouts
import MainLayout from "./layouts/MainLayout"
//Import components
import { Home,Login,Register,Error404,Callback } from "./features"
//Import the protectedRoute
import ProtectedRoute from "./routes/ProtectedRoute"

const router = createBrowserRouter([
  //Parrent element
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        index:true,
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"home",        
        element:(<ProtectedRoute  requiredRoles={["user", "admin", "guest"]}>
                  <Home/>
                </ProtectedRoute>)
      }
    ]
  },
  {
    path:"/callback",
    element:<Callback/>
  },
  {
    path:"*",
    element:<Error404/>
  }

])
function App() {
  return   <RouterProvider router={router} />
}

export default App
