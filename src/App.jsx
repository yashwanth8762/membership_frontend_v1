// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import AboutTrust from './pages/AboutTrustPage.jsx';
import Login from './pages/Login';
import { ROLES } from "../config";
import RootOutlet from './RootOutlet';
import DefaultOutlet from "./DefaultOutlet";
import AdminHome from './pages/Admin/AdminHome';
import Membership from './pages/Admin/Membership';
import AddMembershipForm from './pages/Admin/AddMembershipForm';
import UserMembership from './pages/UserMembership';
import UserDetailsPage from './pages/UserDetailsPage.jsx';
import ActivityDashboard from './pages/Admin/ActivityDashboard.jsx';
import EditActivity from './pages/Admin/EditActivity.jsx';
import AddActivity from './pages/Admin/AddActivity.jsx';
import ProgramDashboard from './pages/Admin/ProgramDashboard.jsx';
import AddProgram from './pages/Admin/AddProgram.jsx';
import EditProgram from './pages/Admin/EditProgram.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import GalleryDashoard from './pages/Admin/GalleryDashoard.jsx';
import AddGallery from './pages/Admin/AddGallery.jsx';
import AboutTrustPage from './pages/AboutTrustPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import ActivitiesPage from './pages/ActivitiesPage.jsx';
import ActivitySpecificPage from './pages/ActivitySpecificPage.jsx';
import UpcomingPrograms from './pages/UpcomingPrograms.jsx';
import UpcomingProgramSpecific from './pages/UpcomingProgramSpecific.jsx';
import MembershipCard from './components/MembershipCard.jsx';
import OrganizationPage from './pages/OrganizationPage.jsx';
import ContactUsPage from './pages/ContactUsPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import RefundPolicyPage from './pages/RefundPolicyPage.jsx';
import TermsConditions from './pages/TermsConditions.jsx';
import DonatePage from './pages/DonatePage.jsx';


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

            
            <Route path="activity" element={<DefaultOutlet />}>
              <Route index element={<Navigate to="/dashboard/activity/list" />} />
              <Route path="list" element={<ActivityDashboard />} />
              <Route path="create" element={<AddActivity />} />
              <Route path="edit/:id" element={<EditActivity />} />
            </Route>
            <Route path="program" element={<DefaultOutlet />}>
              <Route index element={<Navigate to="/dashboard/program/list" />} />
              <Route path="list" element={<ProgramDashboard />} />
              <Route path="create" element={<AddProgram />} />
              <Route path="edit/:id" element={<EditProgram />} />
            </Route>
            <Route path="gallery" element={<DefaultOutlet />}>
              <Route index element={<Navigate to="/dashboard/gallery/list" />} />
              <Route path="list" element={<GalleryDashoard />} />
              <Route path="create" element={<AddGallery />} />
              {/* <Route path="edit/:id" element={<EditActivity />} /> */}
            </Route>
          </Route>
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/about-trust" element={<AboutTrustPage />} />
          <Route path='/gallery' element={<GalleryPage />} />
          <Route path="/culture-history" element={<CommunityPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activities/:id" element={<ActivitySpecificPage />} />
          <Route path="/userMembership" element={<UserMembership />} />
          <Route path="/upcoming-programs" element={<UpcomingPrograms />} />
          <Route path="/upcoming-programs/:id" element={<UpcomingProgramSpecific/>} />
          <Route path="/admin" element={<Login />} />
          <Route path="/membership/user/:membershipId" element={<UserDetailsPage />} />
          <Route path="/membershipcard" element={<MembershipCard />} />
          <Route path="/organization" element={<OrganizationPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/donate" element={<DonatePage />} />
        </>
      )}
    </Routes>
  );
}
