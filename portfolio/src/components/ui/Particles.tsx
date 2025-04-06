"use client";

import { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export default function Particles({
  className = "",
  quantity = 40,
  color = "#ffffff",
  staticity = 50,
  ease = 30,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Array<Particle>>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationId = useRef<number | null>(null);

  const resizeObserver = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }

    initCanvas();
    animate();
    handleResize();
    window.addEventListener("mousemove", onMouseMove);

    resizeObserver.current = new ResizeObserver(handleResize);
    if (canvasContainerRef.current) {
      resizeObserver.current.observe(canvasContainerRef.current);
    }

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      window.removeEventListener("mousemove", onMouseMove);
      if (resizeObserver.current && canvasContainerRef.current) {
        resizeObserver.current.unobserve(canvasContainerRef.current);
      }
    };
  }, [refresh]);

  class Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    size: number;
    color: string;
    dx: number;
    dy: number;
    vx: number;
    vy: number;
    force: number;
    angle: number;
    distance: number;
    friction: number;
    ease: number;

    constructor(
      x: number,
      y: number,
      size: number,
      color: string,
      ease: number
    ) {
      this.x = this.originX = x;
      this.y = this.originY = y;
      this.size = size;
      this.color = color;
      this.dx = 0;
      this.dy = 0;
      this.vx = 0;
      this.vy = 0;
      this.force = 0;
      this.angle = 0;
      this.distance = 0;
      this.friction = Math.random() * 0.02 + 0.92;
      this.ease = ease;
    }

    draw() {
      if (!context.current) return;
      context.current.fillStyle = this.color;
      context.current.beginPath();
      context.current.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.current.fill();
    }

    update() {
      if (!mouse.current) return;

      this.dx = mouse.current.x - this.x;
      this.dy = mouse.current.y - this.y;
      this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
      this.force = -this.ease * (1 / Math.max(this.distance, 1));

      if (this.distance < staticity) {
        this.angle = Math.atan2(this.dy, this.dx);
        this.vx += this.force * Math.cos(this.angle);
        this.vy += this.force * Math.sin(this.angle);
      }

      this.x += this.vx * this.friction + (this.originX - this.x) * 0.05;
      this.y += this.vy * this.friction + (this.originY - this.y) * 0.05;

      this.draw();
    }
  }

  const initCanvas = () => {
    particles.current = [];
    if (!canvasRef.current || !canvasContainerRef.current || !context.current) return;

    const container = canvasContainerRef.current;
    const canvas = canvasRef.current;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    for (let i = 0; i < quantity; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2 + 1;

      particles.current.push(new Particle(x, y, size, color, ease));
    }
  };

  const animate = () => {
    if (!context.current || !canvasRef.current) return;

    context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    particles.current.forEach((particle) => {
      particle.update();
    });

    animationId.current = requestAnimationFrame(animate);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    mouse.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleResize = () => {
    if (!canvasRef.current || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    canvasRef.current.width = container.clientWidth;
    canvasRef.current.height = container.clientHeight;

    initCanvas();
  };

  return (
    <div
      ref={canvasContainerRef}
      className={`absolute inset-0 z-0 ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
