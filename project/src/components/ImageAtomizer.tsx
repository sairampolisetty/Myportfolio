import React, { useRef, useEffect } from 'react';

interface ImageAtomizerProps {
  imageUrl: string;
}

export const ImageAtomizer: React.FC<ImageAtomizerProps> = ({ imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    let isVisible = false;
    let hasAnimatedIn = false;
    
    const triggerExplosion = () => {
      if (hasAnimatedIn || particlesArray.length === 0) return;
      hasAnimatedIn = true;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      particlesArray.forEach(p => {
         const dx = p.x - centerX;
         const dy = p.y - centerY;
         const dist = Math.sqrt(dx*dx + dy*dy) || 1;
         const force = (Math.random() * 40) + 20; // explosive force
         p.vx = (dx / dist) * force + (Math.random() - 0.5) * 50;
         p.vy = (dy / dist) * force + (Math.random() - 0.5) * 50;
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        triggerExplosion();
        animate();
      }
    });
    observer.observe(canvas);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    // Cap DPR to dramatically reduce particle count on mobile (fixes 5-second load time freeze)
    const dpr = isMobile ? 0.8 : Math.min(window.devicePixelRatio || 1, 1.2);
    const step = 1; 

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120 * dpr
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) * (canvas.width / rect.width);
      mouse.y = (event.clientY - rect.top) * (canvas.height / rect.height);
    };

    const handleTouchMove = (event: TouchEvent) => {
      // Prevent scrolling when swiping on the image
      if (event.cancelable) event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];
      mouse.x = (touch.clientX - rect.left) * (canvas.width / rect.width);
      mouse.y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleMouseLeave);
    canvas.addEventListener('touchcancel', handleMouseLeave);

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl;

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      density: number;
      vx: number;
      vy: number;
      friction: number;
      ease: number;
      r: number;
      g: number;
      b: number;
      a: number;

      constructor(x: number, y: number, r: number, g: number, b: number, a: number) {
        this.x = x; 
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.density = (Math.random() * 80) + 40; // Massive force for fast explosion
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.8; // Slightly more friction so they don't slide forever
        this.ease = 0.15; // Snappy return without overpowering the explosion
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          
          this.vx -= forceDirectionX * force * this.density;
          this.vy -= forceDirectionY * force * this.density;
        }

        this.x += (this.baseX - this.x) * this.ease;
        this.y += (this.baseY - this.y) * this.ease;

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;
      }
    }

    image.onload = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const cssWidth = rect?.width || 400;
      const cssHeight = rect?.height || 400;

      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      
      const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
      const imgWidth = image.width * scale;
      const imgHeight = image.height * scale;
      const offsetX = (canvas.width - imgWidth) / 2;
      const offsetY = (canvas.height - imgHeight) / 2;

      ctx.drawImage(image, offsetX, offsetY, imgWidth, imgHeight);
      
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4;
          const a = pixels.data[index + 3];
          if (a > 10) {
            const r = pixels.data[index];
            const g = pixels.data[index + 1];
            const b = pixels.data[index + 2];
            particlesArray.push(new Particle(x, y, r, g, b, a));
          }
        }
      }
      
      if (isVisible) {
        triggerExplosion();
      }
      animate();
    };

    const animate = () => {
      if (!isVisible) return;
      
      // Use raw typed arrays (ImageData) instead of fillRect for blistering fast rendering
      // This allows us to draw a true 1:1 image without performance drops
      const imgData = ctx.createImageData(canvas.width, canvas.height);
      const data = imgData.data;
      const width = canvas.width;
      const height = canvas.height;

      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];
        p.update();
        
        const px = Math.round(p.x);
        const py = Math.round(p.y);
        
        if (px >= 0 && px < width && py >= 0 && py < height) {
          const index = (py * width + px) * 4;
          data[index] = p.r;
          data[index + 1] = p.g;
          data[index + 2] = p.b;
          data[index + 3] = p.a;
        }
      }
      
      // Push all pixels to GPU in a single call
      ctx.putImageData(imgData, 0, 0);
      animationFrameId = requestAnimationFrame(animate);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchMove);
      canvas.removeEventListener('touchend', handleMouseLeave);
      canvas.removeEventListener('touchcancel', handleMouseLeave);
    };
  }, [imageUrl]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #1f1f1f' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'url(/hover.png) 10 0, pointer'
        }}
      />
    </div>
  );
};
