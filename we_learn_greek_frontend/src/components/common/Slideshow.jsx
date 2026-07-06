import { useState } from 'react';
import slider1 from '../../assets/images/slider_1.jpg';

function Slideshow() {
  console.log('Slideshow rendering');
  console.log('Image path:', slider1); // Debug image path

  return (
    <div className="relative h-[600px] w-full bg-gray-200">
      {/* Test with a single image first */}
      <img 
        src={slider1} 
        alt="Test slide"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-4xl text-white">Test Slide</h2>
      </div>
    </div>
  );
}

export default Slideshow;