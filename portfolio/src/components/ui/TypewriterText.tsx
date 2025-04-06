import React, { useRef, useEffect, useState, ElementType } from 'react';
import { useTypewriter } from '../../lib/useTypewriter';
import { cn } from '../../lib/utils';

interface TypewriterTextProps {
  text: string | React.ReactNode;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  tag?: ElementType;
  cursor?: boolean;
  inView?: boolean;
  parentTag?: string;
}

export function TypewriterText({
  text,
  className = '',
  speed = 30,
  delay = 0,
  onComplete,
  tag: Component = 'div',
  cursor = true,
  inView = true,
  parentTag
}: TypewriterTextProps) {
  // Convert ReactNode to string if needed
  const textContent = typeof text === 'string' ? text : JSON.stringify(text);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  // Automatically determine the appropriate tag based on parent element
  // If inside a <p>, use a <span> instead of a <div>
  let FinalComponent = Component;
  if (parentTag === 'p') {
    FinalComponent = 'span';
  }

  const { displayText, isTyping } = useTypewriter({
    text: textContent,
    speed,
    delay,
    onComplete,
    enabled: isVisible && inView
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to observe anymore
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  // If this is a React element and typewriter is complete, render the original
  if (typeof text !== 'string' && !isTyping && isVisible) {
    return <FinalComponent className={className}>{text}</FinalComponent>;
  }

  return (
    <FinalComponent
      className={cn(className, "relative")}
      ref={elementRef as any}
    >
      {displayText}
      {cursor && isTyping && (
        <span className="ml-0.5 inline-block h-4 w-0.5 animate-blink bg-current" />
      )}
    </FinalComponent>
  );
}