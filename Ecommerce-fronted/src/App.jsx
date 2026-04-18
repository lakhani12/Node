import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Joinus from "./pages/Joinus";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { DataContext } from "./context/UserContext.jsx";

const App = () => {
  const { userdata } = useContext(DataContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/joinus" element={<Joinus />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<EditProfile />} />
      </Routes>
    </>
  );
};

export default App;

