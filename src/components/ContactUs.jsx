import React from 'react'
import { useSelector } from 'react-redux'

const ContactUs = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <section id="contact-us" className="bg-gradient-to-br from-gray-50 to-blue-50 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3">
            {user.language ? 'Contact Us' : 'ಸಂಪರ್ಕಿಸಿ'}
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            {user.language 
              ? 'Get in touch with us for any inquiries, support, or collaboration opportunities.'
              : 'ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು, ಬೆಂಬಲ ಅಥವಾ ಸಹಯೋಗದ ಅವಕಾಶಗಳಿಗಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.'
            }
          </p>
        </div>

        {/* First Row - Address and Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Address Section */}
          <div className="bg-white rounded-xl p-5 lg:p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {user.language ? 'Our Address' : 'ನಮ್ಮ ವಿಳಾಸ'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-600 text-sm">
                    {user.language ? 'Main Office' : 'ಮುಖ್ಯ ಕಛೇರಿ'}
                  </p>
                  <p className="text-gray-900 font-medium">
                    Karnataka Madara Mahasabha<br />
                    {user.language ? 'Bangalore, Karnataka, India' : 'ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ, ಭಾರತ'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-xl p-5 lg:p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              {user.language ? 'Get In Touch' : 'ಸಂಪರ್ಕಿಸಿ'}
            </h3>
            
            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm text-gray-600">
                    {user.language ? 'Email us' : 'ಇಮೇಲ್ ಮಾಡಿ'}
                  </p>
                  <a 
                    href="mailto:info@karnatakamadaramahasabha.org" 
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm lg:text-base transition-colors duration-200 truncate block"
                  >
                    info@karnatakamadaramahasabha.org
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm text-gray-600">
                    {user.language ? 'Call us' : 'ಕರೆ ಮಾಡಿ'}
                  </p>
                  <a 
                    href="tel:+918012345678" 
                    className="text-green-600 hover:text-green-800 font-medium text-sm lg:text-base transition-colors duration-200"
                  >
                    +91 801 234 5678
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm text-gray-600">WhatsApp</p>
                  <a 
                    href="https://wa.me/918012345678" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 font-medium text-sm lg:text-base transition-colors duration-200"
                  >
                    +91 801 234 5678
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Office Hours Card */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-5 lg:p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {user.language ? 'Office Hours' : 'ಕಛೇರಿ ಸಮಯಗಳು'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex justify-between sm:flex-col sm:space-y-1">
                  <span className="text-gray-600 text-sm">
                    {user.language ? 'Monday - Friday' : 'ಸೋಮವಾರ - ಶುಕ್ರವಾರ'}
                  </span>
                  <span className="font-medium text-gray-900 text-sm">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col sm:space-y-1">
                  <span className="text-gray-600 text-sm">
                    {user.language ? 'Saturday' : 'ಶನಿವಾರ'}
                  </span>
                  <span className="font-medium text-gray-900 text-sm">
                    9:00 AM - 2:00 PM
                  </span>
                </div>
                <div className="flex justify-between sm:flex-col sm:space-y-1">
                  <span className="text-gray-600 text-sm">
                    {user.language ? 'Sunday' : 'ಭಾನುವಾರ'}
                  </span>
                  <span className="font-medium text-gray-900 text-sm">
                    {user.language ? 'Closed' : 'ಮುಚ್ಚಲಾಗಿದೆ'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default ContactUs
