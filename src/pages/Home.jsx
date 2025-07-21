// src/pages/Home.jsx
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import AboutTrust from '../components/AboutTrust';
import CoomunityHistory from '../components/CoomunityHistory';
import UpcomingActivities from '../components/UpcomingActivities';
import  Activities  from '../components/Activities';

export default function Home() {
  return (
    <>
    <Header />
    <HeroSection />
    <AboutTrust />
    <CoomunityHistory />
    <Activities />
    <UpcomingActivities />
    <Footer />
   </>
  );
}
