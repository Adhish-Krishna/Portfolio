import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface CodeRevealProps {
  text: string;
  className?: string;
  cursorColor?: string;
  typingSpeed?: number;
  glitchProbability?: number;
  colorAccent?: string;
  onComplete?: () => void;
  delay?: number;
  tag?: React.ElementType;
}

export function CodeReveal({
  text,
  className = '',
  cursorColor = "#38d9f5",
  typingSpeed = 70,
  glitchProbability = 0.2,
  colorAccent = "#38d9f5",
  onComplete,
  delay = 500,
  tag: Component = 'div'
}: CodeRevealProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);

  // Function to add random glitch characters
  const getRandomGlitch = () => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,./<>?`~";
    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
  };

  // Create styled spans for each character with random highlight effects
  const renderStyledText = () => {
    return displayText.split('').map((char, index) => {
      // Random styling for some characters
      const isHighlighted = Math.random() < 0.3;

      return (
        <span
          key={index}
          className={cn(
            "transition-all duration-300",
            isHighlighted ? `text-[${colorAccent}] font-bold` : ""
          )}
          style={{
            // Subtle staggered fade in
            opacity: 1,
            animation: `fadeIn 0.3s ease ${index * 0.02}s`
          }}
        >
          {char}
        </span>
      );
    });
  };

  useEffect(() => {
    // Reset state when text changes
    setDisplayText('');
    setCursorPosition(0);

    // Delay before typing starts
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      let finalText = '';

      // Typing effect with occasional glitches
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          // Sometimes add a glitch character that gets corrected in the next iteration
          const shouldGlitch = Math.random() < glitchProbability && currentIndex < text.length;

          if (shouldGlitch) {
            finalText = text.substring(0, currentIndex) + getRandomGlitch();
            // Quickly correct the glitch
            setTimeout(() => {
              setDisplayText(text.substring(0, currentIndex));
            }, typingSpeed / 2);
          } else {
            finalText = text.substring(0, currentIndex);
          }

          setDisplayText(finalText);
          setCursorPosition(currentIndex); // Update cursor position to match current text length
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          // Hide cursor after typing is complete
          setShowCursor(false);
          if (onComplete) onComplete();
        }
      }, typingSpeed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, typingSpeed, delay, glitchProbability, onComplete]);

  return (
    <Component className={cn("relative", className)}>
      {renderStyledText()}
      {isTyping && showCursor && (
        <span
          className="inline-block ml-0.5 h-[1.2em] w-[3px] animate-pulse absolute"
          style={{
            backgroundColor: cursorColor,
            left: `${cursorPosition}ch`,
            top: '0'
          }}
        />
      )}

      {/* Add subtle CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Component>
  );
}