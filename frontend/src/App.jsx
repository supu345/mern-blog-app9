import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/admin";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Authors from "./pages/Authors";
import BlogList from "./pages/Dashboard/BlogList";
import CreateBlog from "./pages/Dashboard/CreateBlog";
import EditBlog from "./pages/Dashboard/EditBlog";
import BlogDetails from "./pages/BlogDetails";
import LoginPage from "./pages/LoginPage";
import OtpPage from "./pages/OtpPage";
import { Toaster } from "react-hot-toast";
import Contact from "./pages/Contact";
import ContactList from "./pages/Dashboard/ContactList";
import SubscribeList from "./pages/Dashboard/subsList";
import UserList from "./pages/Dashboard/UserList";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/blogList" element={<BlogList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/editBlog/:blogId" element={<EditBlog />} />
          <Route path="/details/:id" element={<BlogDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contactList" element={<ContactList />} />
          <Route path="/subscribeList" element={<SubscribeList />} />
          <Route path="/userList" element={<UserList />} />
        </Routes>

        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
