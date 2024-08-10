import { Route, Routes } from "react-router-dom"
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import About from "./component/About"
import ErrorPage from "./component/ErrorPage"
const App = () =>{
  return(
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route exact path='*' element={<ErrorPage/>}/>
    </Routes>
    </>
  )
}
export default App