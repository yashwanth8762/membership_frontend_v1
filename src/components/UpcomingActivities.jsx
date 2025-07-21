import React from 'react'
import Marquee from "react-fast-marquee";

const ActivityCard = ({ title, date, location, time, description, image }) => (
  <div className="w-[350px] p-4 mx-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="space-y-2 text-gray-600">
      <p className="flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {date}
      </p>
      <p className="flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {location}
      </p>
      <p className="flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {time}
      </p>
      <p className="text-gray-500">{description}</p>
    </div>
  </div>
);

const UpcomingActivities = () => {
  const activities = [
    {
      title: "Annual Community Festival",
      date: "June 15, 2024",
      location: "Community Center",
      time: "10:00 AM - 6:00 PM",
      description: "Join us for a day of celebration with music, food, and activities for all ages.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Youth Leadership Workshop",
      date: "July 2, 2024",
      location: "Training Hall",
      time: "2:00 PM - 5:00 PM",
      description: "Empowering young leaders with essential skills and knowledge.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Health & Wellness Fair",
      date: "July 20, 2024",
      location: "Sports Complex",
      time: "9:00 AM - 4:00 PM",
      description: "Free health checkups, fitness classes, and wellness seminars.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Cultural Night",
      date: "August 5, 2024",
      location: "Auditorium",
      time: "6:00 PM - 9:00 PM",
      description: "Experience diverse performances, art, and traditional cuisine.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Environmental Workshop",
      date: "August 15, 2024",
      location: "Green Park",
      time: "3:00 PM - 6:00 PM",
      description: "Learn about sustainability and participate in eco-friendly activities.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Senior Citizens' Meet",
      date: "September 1, 2024",
      location: "Community Hall",
      time: "11:00 AM - 2:00 PM",
      description: "Special gathering for our senior members with lunch and entertainment.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="w-full py-12 overflow-hidden">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">Upcoming Program's</h2>
      <Marquee
        gradient={true}
        speed={40}
        pauseOnHover={true}
      >
        {activities.map((activity, index) => (
          <ActivityCard key={index} {...activity} />
        ))}
      </Marquee>
    </section>
  )
}

export default UpcomingActivities
