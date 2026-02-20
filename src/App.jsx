import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { AddProduct } from "./pages/addProduct"
import { ProductList } from "./pages/productList"
import { EditProduct } from "./pages/editProduct"
export const serverUrl = "https://project-management-system-backend-ixpc.onrender.com"


function App() {

  return (
    <>
    <BrowserRouter>
     <Navbar/>
     <Routes>
       <Route path="/" element={<ProductList/>}/>
       <Route path="/add-product" element={<AddProduct/>}/>
       <Route path="/edit-product/:id" element={<EditProduct/>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
