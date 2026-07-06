import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaPenNib, FaCheck, FaLanguage, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const [index, setIndex] = useState(0);
  const sentences = [
    "Master Greek grammar with ease!",
    "Learn Greek verbs and nouns!",
    "Explore Greek vocabulary!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <FaBook size={40} className="text-blue-600" />,
      title: "Dictionary",
      description: "A personalized vocabulary builder where students can add Greek words with pronunciation and translations.",
    },
    {
      icon: <FaPenNib size={40} className="text-blue-600" />,
      title: "Declinator",
      description: "Helps students master Greek grammar by exploring noun forms, cases, and variations.",
    },
    {
      icon: <FaCheck size={40} className="text-blue-600" />,
      title: "Conjugator",
      description: "Enables learners to study Greek verbs by providing all possible verb forms and tenses.",
    },
    {
      icon: <FaLanguage size={40} className="text-blue-600" />,
      title: "Greek to Greek Glossary",
      description: "Provides Greek word definitions entirely in Greek, reinforcing immersion and comprehension.",
    },
    {
      icon: <FaGlobe size={40} className="text-blue-600" />,
      title: "Transparent Greek Words",
      description: "Highlights Greek words in various languages, helping learners appreciate Greek linguistic influence.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative h-[547px] w-screen overflow-hidden">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 mx-auto text-6xl font-bold text-center text-white z-20"
        >
          {sentences[index]}
        </motion.h1>
        
        <video
          src="/src/assets/videos/background_video.mp4"
          className="w-screen h-full object-cover absolute top-0 left-0"
          autoPlay
          muted
          loop
          playsInline
        />
        
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      <section className="w-full bg-gradient-to-r from-blue-800 to-blue-500 py-16 px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">About Us</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 rounded-lg p-8 shadow-md">
            <p className="text-white text-lg leading-relaxed">
              "We Learn Greek was born from a simple idea — to make learning Greek approachable, inspiring, and highly engaging." Instead of following the traditional classroom model, we provide a non-formal, self-paced learning environment. Our platform encourages users to interact with the language by practicing grammar through structured declensions and verb conjugations, enriching their vocabulary by creating a personal dictionary, and immersing themselves in language actively — not passively. Every tool is thoughtfully designed to help learners overcome typical barriers and build a strong, practical command of Greek.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-8 shadow-md">
            <p className="text-white text-lg leading-relaxed">
              "Greek is not just a language — it's the origin of science, philosophy, and global vocabulary." Our mission goes beyond grammar drills — we want users to experience the beauty, logic, and influence of Greek language and culture. Through the Transparent Words section, you'll uncover how countless modern words from English, French, German, Spanish and other languages trace their roots back to Greek.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
            What We Are Offering
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.slice(3).map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:scale-105 transition-transform">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
            <div></div>
          </div>

          <div className="text-center mt-16">
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md text-lg transition">
              Get Started - Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
