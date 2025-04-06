import { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill = "white" }: SpotlightProps) => {
  const spotlightRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);

  // Animation setup on mount
  useEffect(() => {
    setMounted(true);

    // Ocean-like wave effect
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;

      // Calculate wave properties based on time
      const baseY = Math.sin(time) * 10;
      const turbulence = Math.sin(time * 1.5) * 5;

      // Apply to the filter and ellipse to create underwater light effect
      const filter = spotlight.querySelector('filter');
      if (filter) {
        const blur = 150 + Math.sin(time * 0.7) * 20;
        filter.setAttribute('stdDeviation', blur.toString());
      }

      // Animate the ellipse position and shape
      const ellipse = spotlight.querySelector('ellipse');
      if (ellipse) {
        // Apply wave-like transforms to the ellipse
        const cx = parseFloat(ellipse.getAttribute('cx') || '0');
        const cy = parseFloat(ellipse.getAttribute('cy') || '0');

        // Add subtle movement to create underwater light refraction effect
        ellipse.setAttribute('transform',
          `matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 ${2291.09 + baseY}) rotate(${turbulence * 0.5} ${cx} ${cy})`
        );

        // Pulsing opacity
        const opacityBase = 0.21;
        const opacityWave = Math.sin(time * 2) * 0.05;
        ellipse.setAttribute('fill-opacity', (opacityBase + opacityWave).toString());
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <svg
      ref={spotlightRef}
      className={cn(
        "pointer-events-none fixed z-[1] h-[169%] w-[138%] lg:w-[84%]",
        mounted ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        transition: "opacity 1.5s ease-in-out",
        position: "fixed",
        top: "-50%", // Adjusted position to be lower
        left: "-20%", // Less extreme positioning
        right: "auto",
        transform: "rotate(0deg)", // Reduced angle for less steepness
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
          style={{
            transition: "all 0.5s ease",
          }}
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};
