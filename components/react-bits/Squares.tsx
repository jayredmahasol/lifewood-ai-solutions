import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}

const Squares: React.FC<SquaresProps> = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const numSquaresX = useRef<number>();
  const numSquaresY = useRef<number>();
  const gridOffset = useRef({ x: 0, y: 0 });
  const mousePosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Start from -1 to cover edges when offset shifts
      for (let x = -1; x < numSquaresX.current! + 1; x++) {
        for (let y = -1; y < numSquaresY.current! + 1; y++) {
          const squareX = (x * squareSize) + (gridOffset.current.x % squareSize);
          const squareY = (y * squareSize) + (gridOffset.current.y % squareSize);

          if (mousePosition.current) {
            const mouseX = mousePosition.current.x;
            const mouseY = mousePosition.current.y;
            
            if (mouseX >= squareX && mouseX < squareX + squareSize &&
                mouseY >= squareY && mouseY < squareY + squareSize) {
              ctx.fillStyle = hoverFillColor;
              ctx.fillRect(squareX, squareY, squareSize, squareSize);
            }
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      // Gradient overlay removed as requested

      // Corrected direction logic
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x + speed) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x - speed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y - speed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y + speed) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x + speed) % squareSize;
          gridOffset.current.y = (gridOffset.current.y + speed) % squareSize;
          break;
      }

      requestRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full border-none block"
      onMouseMove={(e) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        mousePosition.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }}
      onMouseLeave={() => {
        mousePosition.current = null;
      }}
    />
  );
};

export default Squares;
