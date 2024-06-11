// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center px-4 py-16 md:px-8 lg:px-16 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-900">About Our Event</h1>
      
      {/* Mission & Vision Section */}
      <section className="max-w-5xl text-center space-y-6 mb-16">
        <h2 className="text-4xl font-bold text-gray-800">Mission & Vision</h2>
        <p className="text-lg leading-relaxed">
          Our mission is to unite a community of passionate individuals to share knowledge, foster connections, and inspire innovation. Our vision is to create an inclusive platform where ideas are exchanged, and new opportunities are born.
        </p>
      </section>

      {/* Event Highlights Section */}
      <section className="max-w-5xl text-center space-y-6 mb-16">
        <h2 className="text-4xl font-bold text-gray-800">Event Highlights</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed mx-auto max-w-3xl">
          <li>Keynote speeches from industry leaders</li>
          <li>Interactive workshops and hands-on sessions</li>
          <li>Networking opportunities with professionals</li>
          <li>Exhibitions and product showcases</li>
          <li>Entertainment and social events</li>
        </ul>
      </section>

      {/* Schedule Section */}
      <section className="max-w-5xl text-center space-y-6 mb-16">
        <h2 className="text-4xl font-bold text-gray-800">Event Schedule</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold">Day 1: Opening Ceremony</h3>
            <p className="text-lg">10:00 AM - 12:00 PM</p>
            <p className="text-md text-gray-600">Join us for the grand opening of our event with keynote speeches and networking sessions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold">Day 2: Workshops & Sessions</h3>
            <p className="text-lg">9:00 AM - 5:00 PM</p>
            <p className="text-md text-gray-600">Participate in various workshops and sessions led by industry experts.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold">Day 3: Networking & Closing</h3>
            <p className="text-lg">11:00 AM - 3:00 PM</p>
            <p className="text-md text-gray-600">End the event with dedicated networking opportunities and the closing ceremony.</p>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="max-w-5xl text-center space-y-6 mb-16">
        <h2 className="text-4xl font-bold text-gray-800">Our Speakers</h2>
        <p className="text-lg leading-relaxed">
          We are proud to host a lineup of distinguished speakers from various industries. Our speakers are leaders, innovators, and visionaries who will share their insights and experiences.
        </p>
        <div className="flex flex-col md:flex-row items-center mt-8 space-y-6 md:space-y-0 md:space-x-6">
          <img src="path_to_speaker1.jpg" alt="Speaker 1" className="w-full md:w-1/3 rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
          <img src="path_to_speaker2.jpg" alt="Speaker 2" className="w-full md:w-1/3 rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
          <img src="path_to_speaker3.jpg" alt="Speaker 3" className="w-full md:w-1/3 rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-5xl text-center space-y-6 mb-16">
        <h2 className="text-4xl font-bold text-gray-800">Testimonials</h2>
        <div className="space-y-8">
          <blockquote className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <p className="text-lg italic">"This event was a game-changer for me. The sessions were insightful, and the networking opportunities were invaluable."</p>
            <footer className="mt-4 text-gray-600">- Attendee Name</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <p className="text-lg italic">"A fantastic experience! The speakers were top-notch, and I learned so much. Looking forward to next year."</p>
            <footer className="mt-4 text-gray-600">- Attendee Name</footer>
          </blockquote>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="max-w-5xl text-center space-y-6 mb-16">
        <h2 className="text-4xl font-bold text-gray-800">Our Sponsors</h2>
        <p className="text-lg leading-relaxed">
          We are grateful for the support of our sponsors who make this event possible. Their contributions help us create a memorable experience for all attendees.
        </p>
        <div className="flex flex-col md:flex-row items-center mt-8 space-y-6 md:space-y-0 md:space-x-6">
          <img src="path_to_sponsor1_logo.jpg" alt="Sponsor 1" className="w-full md:w-1/3 h-32 object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow" />
          <img src="path_to_sponsor2_logo.jpg" alt="Sponsor 2" className="w-full md:w-1/3 h-32 object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow" />
          <img src="path_to_sponsor3_logo.jpg" alt="Sponsor 3" className="w-full md:w-1/3 h-32 object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow" />
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="max-w-5xl text-center space-y-6 mb-16">
        <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
        <p className="text-lg leading-relaxed">
          Have questions or need more information? Reach out to us, and we'll be happy to assist you.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Submit</button>
          </form>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="max-w-5xl text-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-800">Event Gallery</h2>
        <div className="flex flex-col md:flex-row items-center mt-8 space-y-6 md:space-y-0 md:space-x-6">
          <img src="path_to_image1.jpg" alt="Event" className="w-full md:w-1/3 rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
          <img src="path_to_image2.jpg" alt="Workshop" className="w-full md:w-1/3 rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
          <img src="path_to_image3.jpg" alt="Networking" className="w-full md:w-1/3 rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
        </div>
      </section>
    </div>
  );
};

export default About;
