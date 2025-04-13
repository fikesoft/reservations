import { createBrowserRouter,RouterProvider } from "react-router-dom"
//Import layouts
import MainLayout from "./layouts/MainLayout"
//Import components
import { Home,Login,Register,Error404,Callback,AboutUs,Events,EventPage, Cart } from "./features"
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
      },
      {
        path:"about",        
        element:(<ProtectedRoute  requiredRoles={["user", "admin", "guest"]}>
                  <AboutUs/>
                </ProtectedRoute>)
      },
      {
        path:"events",        
        element:(<ProtectedRoute  requiredRoles={["user", "admin", "guest"]}>
                  <Events/>
                </ProtectedRoute>)
      },
      {
        path:"event-page/:eventId",        
        element:(<ProtectedRoute  requiredRoles={["user", "admin", "guest"]}>
                  <EventPage/>
                </ProtectedRoute>)
      },
      {
        path:"cart",        
        element:(<ProtectedRoute  requiredRoles={["user", "admin", "guest"]}>
                  <Cart/>
                </ProtectedRoute>)
      },

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
