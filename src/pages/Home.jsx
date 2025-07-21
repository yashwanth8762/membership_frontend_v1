// src/pages/Home.jsx
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Welcome to Karnataka Madara Mahasabha
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Join our vibrant community dedicated to empowerment, cultural preservation, and social progress.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/membership"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
            >
              Become a Member
            </Link>
            <Link
              to="/about-trust"
              className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-700 font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
            >
              Learn About Us
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example event cards — replace with real data */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Community Meet</h3>
              <p className="text-gray-600 mb-4">Join us for the annual community gathering.</p>
              <span className="text-sm text-blue-600">15th August 2024, Bengaluru</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Health Camp</h3>
              <p className="text-gray-600 mb-4">Free health check-ups for all members.</p>
              <span className="text-sm text-blue-600">30th August 2024, Mandya</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Cultural Festival</h3>
              <p className="text-gray-600 mb-4">Celebrate Kannada culture and traditions.</p>
              <span className="text-sm text-blue-600">12th September 2024, Mysuru</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
              
    </div>
  );
}
