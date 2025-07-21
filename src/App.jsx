// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import AboutTrust from './pages/AboutTrust';
import Register from './pages/Register';
import Login from './pages/Login';
import { ROLES } from "../config";
import RootOutlet from './RootOutlet';
import DefaultOutlet from "./DefaultOutlet";
import AdminHome from './pages/Admin/AdminHome';
import Membership from './pages/Admin/Membership';
import AddMembershipForm from './pages/Admin/AddMembershipForm';
import UserMembership from './pages/UserMembership';
import UserDetailsPage from './pages/UserDetailsPage.jsx';


export default function App() {
  const [auth, setAuth] = useState(null);
  const user = useSelector((state) => state.user.value);
  const isAdmin = ROLES.ADMIN === user?.role;
  console.log(user)
  useEffect(() => {
    async function checkIsLoggedIn() {
      if (user?.is_logged_in) {
        // Replace with your actual verifyToken logic
        // const checkToken = await verifyToken(user.access_token);
        // setAuth(checkToken.status);
        setAuth(true); // TEMP: always true for demo
      } else {
        setAuth(false);
      }
    }
    checkIsLoggedIn();
  }, [user]);

  if (auth === null) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-trust" element={<AboutTrust />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {isAdmin ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<RootOutlet />}>
            <Route index element={<AdminHome />} />
            <Route path="membership/create" element={<AddMembershipForm />} />
            <Route path="membership" element={<Membership />} />
            
            {/* <Route path="membership" element={<DefaultOutlet />}>
              <Route index element={<Navigate to="/dashboard/users/list" />} />
              <Route path="list" element={<Users />} />
              <Route path="create" element={<AddUser />} />
              <Route path="edit/:id" element={<EditUser />} />
            </Route> */}
          </Route>
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/about-trust" element={<AboutTrust />} />
          <Route path="/userMembership" element={<UserMembership />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/membership/user/:membershipId" element={<UserDetailsPage />} />

        </>
      )}
    </Routes>
  );
}
