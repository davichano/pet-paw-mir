import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../views/Home";
import Feed from "../views/Feed";
import DetailsPublication from "../views/DetailsPublication";
import UserProfile from "../views/users/Profile";
import UserEditProfile from "../views/users/EditProfile";
import Header from "../components/template/Header.jsx";
import SignUp from "../views/SignUp.jsx";
import Login from "../views/Login.jsx";
import { Toaster } from "sonner";
import NewPostPet from "../views/NewPostPet.jsx";
import NewPostState from "../views/NewPostState.jsx";

export const MainRouter = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/register", "/signup", "/login"];
  return (
    <>
      <Toaster richColors expand={true} />
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/pet/:id" element={<DetailsPublication />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/user/edit/:id" element={<UserEditProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<NewPostPet/>} />
        <Route path="/post/state" element={<NewPostState/>}/>
      </Routes>
    </>
  );
};
