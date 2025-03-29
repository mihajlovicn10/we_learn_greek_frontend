import React from 'react';
import Layout from '../components/layout/Layout';

const Home = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-8">WeLearnGreek</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-center mb-8">
          Your comprehensive resource for learning Greek language
        </p>
        <div className="flex justify-center">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
