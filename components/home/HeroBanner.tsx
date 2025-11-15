'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      image: '/images/siyanaBg.jpg',
      title: 'Exquisite Jewelry Collection',
      subtitle: 'Discover our premium gold and diamond jewelry'
    },
    {
      image: '/images/hero-2.jpg',
      title: 'New Arrivals',
      subtitle: 'Latest designs for every occasion'
    },
    {
      image: '/images/hero-3.jpg',
      title: 'Special Offers',
      subtitle: 'Up to 25% off on selected items'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-96 flex items-center justify-center overflow-hidden rounded-3xl m-4">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {slides[currentSlide].title}
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90">
          {slides[currentSlide].subtitle}
        </p>
        <button className="mt-6 px-8 py-3 bg-yellow-400 text-gray-900 font-semibold uppercase tracking-wider rounded-lg hover:bg-yellow-300 transition shadow-lg">
          Shop Now
        </button>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/70 p-3 rounded-full text-gray-700 hover:bg-white z-30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/70 p-3 rounded-full text-gray-700 hover:bg-white z-30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;