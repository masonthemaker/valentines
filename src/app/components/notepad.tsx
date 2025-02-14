import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import Image from 'next/image';

interface NotepadProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onYesClick: () => void;
}

const Notepad: React.FC<NotepadProps> = ({ isOpen, onClose, message, onYesClick }) => {
  const [mounted, setMounted] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 300); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    // Close notepad and trigger parent callback after confetti
    setTimeout(() => {
      setShowConfetti(false);
      onClose();
      onYesClick();
    }, 5000);
  };

  const getNoButtonText = () => {
    switch (noClickCount) {
      case 1:
        return "wtf?";
      case 2:
        return "rlly?";
      default:
        return "No";
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
        />
      )}
      
      <div 
        className={`
          bg-white w-[600px] h-[400px] rounded shadow-lg flex flex-col
          transform transition-all duration-300
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        {/* Notepad Header */}
        <div className="bg-gray-200 p-2 flex justify-between items-center border-b border-gray-300">
          <div className="font-pixel text-sm text-gray-700">Message.txt</div>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 px-2"
          >
            ✕
          </button>
        </div>
        
        {/* Notepad Content */}
        <div className="flex-1 p-4 font-mono text-gray-800 whitespace-pre-wrap bg-white overflow-auto">
          {message}
          <div className="mt-20 flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <button
                className="text-red-500 hover:text-red-600 text-xl transition-colors flex items-center gap-2"
                onClick={handleYesClick}
              >
                <span>❤️</span>
                <span className="text-base">Yes</span>
              </button>
              {noClickCount < 3 && (
                <button
                  className="text-gray-400 hover:text-gray-500 text-xl transition-colors flex items-center gap-2"
                  onClick={handleNoClick}
                >
                  <span>💔</span>
                  <span className="text-base">{getNoButtonText()}</span>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Notepad Status Bar */}
        <div className="bg-gray-200 p-1 text-xs text-gray-600 border-t border-gray-300">
          <span>From: Mason</span>
        </div>
      </div>
    </div>
  );
};

export default Notepad;
