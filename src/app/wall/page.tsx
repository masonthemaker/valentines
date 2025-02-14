'use client';

import { GiHearts, GiNestedHearts } from "react-icons/gi";
import { BsArrowThroughHeart } from "react-icons/bs";
import { useEffect, useState } from "react";
import RollingGallery from './components/rotatingImages';

interface Heart {
  id: number;
  x: number;
  y: number;
  icon: number;
  size: number;
  speed: number;
}

export default function Wall() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const createHeart = () => {
      const newHeart: Heart = {
        id: Math.random(),
        x: Math.random() * 100,
        y: -20,
        icon: Math.floor(Math.random() * 3),
        size: Math.random() * (30 - 15) + 15,
        speed: Math.random() * (2 - 0.5) + 0.5,
      };
      setHearts(prev => [...prev, newHeart]);
    };

    const interval = setInterval(createHeart, 300);
    const animationFrame = setInterval(() => {
      setHearts(prev => 
        prev
          .map(heart => ({
            ...heart,
            y: heart.y + heart.speed,
          }))
          .filter(heart => heart.y < 120)
      );
    }, 16);

    return () => {
      clearInterval(interval);
      clearInterval(animationFrame);
    };
  }, [isMounted]);

  const getHeartIcon = (type: number) => {
    switch(type) {
      case 0:
        return <GiHearts />;
      case 1:
        return <GiNestedHearts />;
      default:
        return <BsArrowThroughHeart />;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative animate-bg-shift">
      <div className="pt-8">
        <h1 className="text-center text-3xl font-semibold text-pink-600 mb-4">Our memories ❤️</h1>
        <RollingGallery autoplay={true} pauseOnHover={true} />
      </div>
      
      <div className="max-w-4xl mx-auto p-6 mt-8">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center">My Favorite Things About You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
            <h3 className="text-lg font-medium text-pink-500 mb-2">Your Smile</h3>
            <p className="text-gray-600">It genuienly lights up any room you enter ✨</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
            <h3 className="text-lg font-medium text-pink-500 mb-2">Your Kindness</h3>
            <p className="text-gray-600">How you always put others first 💝</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
            <h3 className="text-lg font-medium text-pink-500 mb-2">Your Humor</h3>
            <p className="text-gray-600">The way you make me laugh every day (with my jokes)😊</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
            <h3 className="text-lg font-medium text-pink-500 mb-2">Your Support</h3>
            <p className="text-gray-600">Always there when I need you most </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
            <h3 className="text-lg font-medium text-pink-500 mb-2">Your Passion</h3>
            <p className="text-gray-600">The dedication you show in everything you do 🌟</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform">
            <h3 className="text-lg font-medium text-pink-500 mb-2">Your Heart</h3>
            <p className="text-gray-600">How deeply you care for those around you ❤️</p>
          </div>
        </div>
      </div>

      {isMounted && hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-pink-500"
          style={{
            left: `${heart.x}vw`,
            top: `${heart.y}vh`,
            fontSize: `${heart.size}px`,
            opacity: 0.7,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          {getHeartIcon(heart.icon)}
        </div>
      ))}
    </div>
  );
}
