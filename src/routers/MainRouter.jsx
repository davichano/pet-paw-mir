// MainRouter.jsx
import {Routes, Route, useLocation} from "react-router-dom";
import Feed from "../views/Feed";
import DetailsPublication from "../views/DetailsPublication";
import UserProfile from "../views/users/Profile";
import UserEditProfile from "../views/users/EditProfile";
import Header from "../components/template/Header.jsx";
import Footer from "../components/template/Footer.jsx";
import SignUp from "../views/SignUp.jsx";
import Login from "../views/Login.jsx";
import PasswordRecovery from "../views/PasswordRecovery.jsx";
import {Toaster} from "sonner";
import NewPostPet from "../views/NewPostPet.jsx";
import NewPostState from "../views/NewPostState.jsx";
import NewPostTag from "../views/NewPostTag.jsx";
import NewPostAddInfo from "../views/NewPostAddInfo.jsx";
import NewPostMap from "../views/NewPostMap.jsx";
import {PetProvider} from "../contexts/post/PetProvider";
import LandingPage from "../views/LandingPage.jsx";
import Settings from "../views/Settings.jsx";
import ProtectedRoute from "./ProtectedRoute";
import ChatInterface from "../views/chat/ChatInterface.jsx";


export const MainRouter = () => {
  const location = useLocation();
  const hideHeaderRoutes = [
    "/register",
    "/signup",
    "/login",
    "/passwordrecovery",
  ];
  return (
    <>
    <PetProvider>
      <Toaster richColors expand={true}/>
      {!hideHeaderRoutes.includes(location.pathname) && <Header/>}

      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/passwordrecovery" element={<PasswordRecovery/>}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/chats" element={<ChatInterface/>}/>


        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed/:filter"
          element={
            <ProtectedRoute>
              <Feed/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pet/:id"
          element={
            <ProtectedRoute>
              <DetailsPublication/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserProfile/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/edit/:id"
          element={
            <ProtectedRoute>
              <UserEditProfile/>
            </ProtectedRoute>
          }
        />


          <Route
            path="/post"
            element={
              <ProtectedRoute>
                  <NewPostPet/>
              </ProtectedRoute>
          }
          />
          <Route
            path="/post/state"
            element={
              <ProtectedRoute>
                  <NewPostState/>
              </ProtectedRoute>
          }
        />
        <Route
          path="/post/tag"
          element={
            <ProtectedRoute>
                <NewPostTag/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/info"
          element={
            <ProtectedRoute>
                <NewPostAddInfo/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/map"
          element={
            <ProtectedRoute>
                <NewPostMap/>
            </ProtectedRoute>
          }
        />
        <Route path="/settings" element={
          <ProtectedRoute><Settings/></ProtectedRoute>
          } />
      </Routes>

      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
      </PetProvider>

    </>
  );
};
