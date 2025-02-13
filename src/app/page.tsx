'use client';

import { GiHearts, GiNestedHearts } from "react-icons/gi";
import { BsArrowThroughHeart } from "react-icons/bs";
import { useEffect, useState } from "react";
import Notepad from './components/notepad';
import TaskList from './components/tasklist';

interface Heart {
  id: number;
  x: number;
  y: number;
  icon: number;
  size: number;
  speed: number;
}

export default function Home() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [showTaskList, setShowTaskList] = useState(false);

  useEffect(() => {
    const createHeart = () => {
      const newHeart: Heart = {
        id: Math.random(),
        x: Math.random() * 100, // random position across screen width
        y: -20, // start above screen
        icon: Math.floor(Math.random() * 3), // randomly select one of three icons
        size: Math.random() * (30 - 15) + 15, // random size between 15-30px
        speed: Math.random() * (2 - 0.5) + 0.5, // random fall speed
      };
      setHearts(prev => [...prev, newHeart]);
    };

    // Create new heart every 300ms
    const interval = setInterval(createHeart, 300);

    // Update heart positions
    const animationFrame = setInterval(() => {
      setHearts(prev => 
        prev
          .map(heart => ({
            ...heart,
            y: heart.y + heart.speed,
          }))
          .filter(heart => heart.y < 120) // remove hearts that fall below screen
      );
    }, 16);

    const timer = setTimeout(() => {
      setShowEnvelope(true);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(animationFrame);
      clearTimeout(timer);
    };
  }, []);

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
    <div className="min-h-screen flex items-center justify-center bg-pink-100 overflow-hidden relative">
      {!showTaskList ? (
        <>
          <div className="z-10">Hello World</div>
          {showEnvelope && (
            <div className="flex flex-col items-center">
              <button 
                onClick={() => setIsNotepadOpen(true)}
                className="cursor-pointer transition-transform hover:scale-110"
              >
                <div className="font-pixel text-8xl text-pink-500 animate-bounce">
                  💌
                </div>
              </button>
              <div className="font-pixel text-2xl text-pink-500 mt-4">
                you&apos;ve got mail from: Mason
              </div>
            </div>
          )}
          
          <Notepad 
            isOpen={isNotepadOpen}
            onClose={() => setIsNotepadOpen(false)}
            message="Dear Olivia,

I heard you don't have a valentine...
do you maybe want to be mine?

Love,
Mason"
            onYesClick={() => setShowTaskList(true)}
          />
          
          {hearts.map(heart => (
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
        </>
      ) : (
        <TaskList />
      )}
    </div>
  );
}
