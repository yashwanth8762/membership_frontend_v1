// src/pages/Home.jsx
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import ContactUs from '../components/ContactUs';
import Organization from '../components/Organization';
import Documents from '../components/Documents';

// Lazy load all main sections
const HeroSection = React.lazy(() => import('../components/HeroSection'));
const AboutTrust = React.lazy(() => import('../components/AboutTrust'));
const CoomunityHistory = React.lazy(() => import('../components/CoomunityHistory'));
const Activities = React.lazy(() => import('../components/Activities'));
const UpcomingActivities = React.lazy(() => import('../components/UpcomingActivities'));
const Gallery = React.lazy(() => import('../components/Gallery'));
const Footer = React.lazy(() => import('../components/Footer'));

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Section = ({ children, id }) => (
  <motion.div
    id={id}
    className="scroll-mt-24"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={sectionVariants}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Header theme='transparent' />
      <Suspense>
        <Section>
          <HeroSection />
        </Section>
        <Section id="about-trust">
          <AboutTrust />
        </Section>
        <Section id="community-and-its-history">
          <CoomunityHistory />
        </Section>
        <Section id="organization">
          <Organization />
        </Section>
        {/* <Section id="activities"> */}
          {/* <Activities /> */}
        {/* </Section> */}
        <Section id="upcoming-programs">
          <UpcomingActivities />
        </Section>
        <Section id="documents">
          <Documents />
        </Section>
        <Section id="gallery">
          <Gallery />
        </Section>
        <Section id="contact-us">
          <ContactUs />
        </Section>
        <Section>
          <Footer />
        </Section>
      </Suspense>
    </div>
  );
}
