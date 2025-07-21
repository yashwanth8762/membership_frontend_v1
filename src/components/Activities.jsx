import React from 'react'

const activities = [
  {
    title: "Annual Community Festival",
    description: "A day of celebration with music, food, and activities for all ages.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Youth Leadership Workshop",
    description: "Empowering young leaders with essential skills and knowledge.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Health & Wellness Fair",
    description: "Free health checkups, fitness classes, and wellness seminars.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Cultural Night",
    description: "Experience diverse performances, art, and traditional cuisine.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Environmental Workshop",
    description: "Learn about sustainability and participate in eco-friendly activities.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Senior Citizens' Meet",
    description: "Special gathering for our senior members with lunch and entertainment.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const Activities = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Activities</h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">Discover a variety of engaging activities designed to bring our community together, foster learning, and celebrate our shared values.</p>
      <div className="flex justify-end mb-6 max-w-6xl mx-auto">
        <a
          href="#"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-200 text-sm"
        >
          View More &gt;
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col overflow-hidden"
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{activity.title}</h3>
              <p className="text-gray-600 flex-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Activities
