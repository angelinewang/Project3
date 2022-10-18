import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import DetailPage from "../DetailPage/DetailPage";
import ImageUpload from "../ImageUpload/ImageUpload";
import UserBlogs from "../UserBlogs/UserBlogs";
import Profile from "../Profile/Profile";
import { ProtectedRoute } from "../../utils/route";
import useUser from "../../hooks/useUser";
import NavBar from "../../components/NavBar/NavBar";
import ProtectedPage from "../ProtectedPage";
import CreateBlogPage from "../createBlogPage/CreateBlogPage";
import EditBlogPage from "../EditBlogPage/EditBlogPage";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import AboutPage from "../AboutPage/AboutPage";

function App() {
  const { refreshAuth } = useUser();

  React.useEffect(() => {
    // async function run() {
    refreshAuth();
    // }
    // run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header className="header">
        <NavBar />
      </header>
      <Routes>
        <Route exact path="*" element={<Navigate to="/" />} />
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/blogpost/detail/:id"
          element={<DetailPage />}
        />{" "}
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/profile/:userID" element={<Profile />} />
        <Route exact path="/profile/:userID/edit" element={<ProfileEdit />} />
        <Route
          exact
          path="/profile/:userID/blogs"
          element={
            <ProtectedRoute>
              <UserBlogs />
            </ProtectedRoute>
          }
        />
        <Route exact path="/blog/new" element={<CreateBlogPage />} />
        <Route exact path="/blog/edit/:blogID" element={<EditBlogPage />} />
        {/* <Route exact path="/blog/:blogID" element={} /> */}
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/upload" element={<ImageUpload />} />
        <Route exact path="/user" element={<UserBlogs />} />
        <Route
          exact
          path="/protected"
          element={<ProtectedRoute>{/* <ProtectedPage /> */}</ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
