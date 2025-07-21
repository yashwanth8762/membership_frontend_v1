import React from 'react'

const AboutTrust = () => {
  return (
    <div>
      {/* Features */}
      <div className="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20 mx-auto">
        {/* Grid */}
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div>
            <img className="rounded-xl shadow-lg border-4 border-blue-100" src="https://images.unsplash.com/photo-1648737963503-1a26da876aca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=900&q=80" alt="About the Trust" />
          </div>
          {/* End Col */}

          <div className="mt-5 sm:mt-10 lg:mt-0">
            <div className="space-y-6 sm:space-y-8">
              {/* Title */}
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-extrabold text-3xl lg:text-4xl text-blue-800">
                  About Our Trust
                </h2>
                <p className="text-gray-600 dark:text-neutral-400 text-lg">
                  Established with a vision to empower communities, <span className="font-semibold text-blue-700">Our Trust</span> is dedicated to fostering growth, education, and well-being for all. Through a range of impactful initiatives, we strive to create opportunities, support the underprivileged, and inspire positive change. Our commitment to transparency, compassion, and innovation drives us to make a meaningful difference every day.
                </p>
              </div>
              {/* End Title */}

              {/* Read More Button */}
              <div>
                <a
                  href="#about"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Features */}
    </div>
  )
}

export default AboutTrust
