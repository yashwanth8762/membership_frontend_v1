// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-200 transition-colors">Home</Link></li>
              <li><Link to="/about-trust" className="hover:text-blue-200 transition-colors">About Trust</Link></li>
              <li><Link to="/membership" className="hover:text-blue-200 transition-colors">Membership</Link></li>
              <li><Link to="/gallery" className="hover:text-blue-200 transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-blue-200 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: info@madaramahasabha.com</li>
              <li>Phone: +91 9876543210</li>
              <li>Address: Community Center, Bengaluru, Karnataka</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-blue-200 transition-colors" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com" className="hover:text-blue-200 transition-colors" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com" className="hover:text-blue-200 transition-colors" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://youtube.com" className="hover:text-blue-200 transition-colors" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-blue-600 text-center">
          <p>© {new Date().getFullYear()} Karnataka Madara Mahasabha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
