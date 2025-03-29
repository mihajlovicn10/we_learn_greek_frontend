import { useState, useEffect, useCallback } from 'react';
import slider1 from '../../assets/images/slider_1.jpg';

/**
 * Slideshow component for displaying a carousel of images
 * 
 * @param {Object} props
 * @param {Array} props.slides - Array of slide objects with src, alt, and caption
 * @param {number} props.interval - Time in ms between auto-slides (0 to disable)
 * @param {boolean} props.showControls - Whether to show navigation controls
 * @param {boolean} props.showIndicators - Whether to show slide indicators
 * @param {string} props.height - Height of the slideshow
 * @param {string} props.className - Additional CSS classes
 */
const Slideshow = ({
  slides = [],
  interval = 5000,
  showControls = true,
  showIndicators = true,
  height = 'h-[600px]',
  className = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // If no slides provided, use the default image
  const slidesData = slides.length > 0 ? slides : [
    {
      src: slider1,
      alt: 'Welcome to WeLearnGreek',
      caption: 'Your comprehensive resource for learning Greek language'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  }, [slidesData.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  }, [slidesData.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (interval <= 0 || slidesData.length <= 1) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    
    return () => clearInterval(timer);
  }, [interval, nextSlide, slidesData.length]);

  return (
    <div className={`relative ${height} w-full overflow-hidden ${className}`}>
      {/* Slides */}
      <div className="h-full relative">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={slide.src} 
              alt={slide.alt || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
              {slide.title && <h2 className="text-4xl text-white font-bold mb-4">{slide.title}</h2>}
              {slide.caption && <p className="text-xl text-white max-w-3xl">{slide.caption}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {showControls && slidesData.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {showIndicators && slidesData.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slideshow;