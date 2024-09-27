
import {Routes, Route, useLocation} from 'react-router-dom';
import Home from '../views/Home';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/template/Header.jsx'
import  SignUp  from '../components/SignUp.jsx';

export const MainRouter=()=>{
  const location = useLocation();
  const hideHeaderRoutes = ["/register","/signup"];
  return(
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header/>}
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </>
  )
}
