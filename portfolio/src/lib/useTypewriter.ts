import { useState, useEffect, useRef } from 'react';

interface TypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  enabled?: boolean;
}

export function useTypewriter({
  text,
  speed = 30,
  delay = 0,
  onComplete,
  enabled = true
}: TypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset state when text changes
    setDisplayText('');
    setIsComplete(false);
    indexRef.current = 0;

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    if (!enabled) {
      setDisplayText(text);
      setIsComplete(true);
      if (onComplete) onComplete();
      return;
    }

    // Initial delay before starting to type
    const delayTimer = window.setTimeout(() => {
      setIsTyping(true);
      typeNextCharacter();
    }, delay);

    return () => {
      window.clearTimeout(delayTimer);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [text, delay, enabled]);

  const typeNextCharacter = () => {
    if (indexRef.current < text.length) {
      // Get the next chunk of text (variable speed based on punctuation)
      const currentChar = text[indexRef.current];
      let chunk = currentChar;
      let pauseTime = speed;

      // For punctuation, add a longer pause
      if (['.', '!', '?', ',', ';', ':'].includes(currentChar)) {
        pauseTime = speed * 3;
      }

      // Update the displayed text
      setDisplayText(prev => prev + chunk);
      indexRef.current += 1;

      // Schedule the next character
      timerRef.current = window.setTimeout(typeNextCharacter, pauseTime);
    } else {
      // Typing is complete
      setIsTyping(false);
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  };

  return { displayText, isTyping, isComplete };
}