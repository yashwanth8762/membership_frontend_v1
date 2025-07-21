import React from 'react'

const CoomunityHistory = () => {
  return (
    <div>
      {/* Features */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Text Section - now on the left */}
          <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
            <div className="space-y-6 sm:space-y-8">
              {/* Title */}
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-bold text-3xl lg:text-4xl text-gray-800">
                  Our Community's History
                </h2>
                <p className="text-gray-600 dark:text-neutral-500 text-lg">
                  Our community has a rich and inspiring history, rooted in unity, resilience, and shared values. From humble beginnings, we have grown into a vibrant network that celebrates diversity and fosters a spirit of togetherness. Over the years, our members have come together to support one another, preserve our traditions, and create a welcoming environment for all. As we look to the future, we remain committed to building on this legacy and empowering every individual to thrive.
                </p>
              </div>
              {/* End Title */}
              {/* Read More Button */}
              <div>
                <a
                  href="#community-history"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          {/* End Col */}

          {/* Images Grid - now on the right */}
          <div className="lg:col-span-7">
            {/* Grid */}
            <div className="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:translate-x-10">
              <div className="col-span-4">
                <img className="rounded-xl" src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80" alt="Community History 1" />
              </div>
              {/* End Col */}

              <div className="col-span-3">
                <img className="rounded-xl" src="https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80" alt="Community History 2" />
              </div>
              {/* End Col */}

              <div className="col-span-5">
                <img className="rounded-xl" src="https://images.unsplash.com/photo-1600194992440-50b26e0a0309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80" alt="Community History 3" />
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Features */}
    </div>
  )
}

export default CoomunityHistory
