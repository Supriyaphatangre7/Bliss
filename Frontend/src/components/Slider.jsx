import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    src: "image/jiwon.jpg",
    title: "Where Elegance Meets Everyday Glam",
    desc: "Unleash your street style. Bold, edgy, and effortlessly cool – just like you.",
  },
  {
    id: 2,
    src: "image/j4.jpg",
    title: "Where Elegance Meets Everyday Glam",
    desc: "Unleash your street style. Bold, edgy, and effortlessly cool – just like you.",
  },
  {
    id: 3,
    src: "image/l1.jpg",
    title: "Where Elegance Meets Everyday Glam",
    desc: "Unleash your street style. Bold, edgy, and effortlessly cool – just like you."
  },
  {
    id: 4,
    src: "image/j2.jpg",
    title: "Fashion with a Conscience",
    desc: "Simplicity with a touch of sophistication. Find your perfect minimal look.",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden rounded-md">
      {/* Slider Container */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full">
            <img
              src={slide.src}
              className="w-full h-full object-cover"
              alt={slide.title}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 text-white drop-shadow-2xl space-y-4 max-w-lg">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl font-medium">{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 btn btn-circle bg-white/30 backdrop-blur-md text-white border-none hover:bg-white/50 transition"
      >
        ❮
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 btn btn-circle bg-white/30 backdrop-blur-md text-white border-none hover:bg-white/50 transition"
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;
