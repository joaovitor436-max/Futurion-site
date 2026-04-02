import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const HoverButton = ({ 
  children, 
  onClick, 
  to,
  href,
  target,
  rel,
  className = '', 
  disabled = false,
  glowColor = '#00D4FF', // Futurion Cyan
  backgroundColor = '#0A0A0F', // Futurion Navy Dark
  textColor = '#F0F0F5', // Futurion Light Text
  hoverTextColor = '#00FFA3', // Futurion Greenish Cyan
  type = 'button'
}) => {
  const buttonRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate glow position
      setGlowPosition({ x, y });

      // Calculate tilt rotation (Antigravity Design)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (centerY - y) / 6; // Intensity of tilt
      const rotateY = (x - centerX) / 6;
      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const content = (
    <>
      <div
        className={`
          absolute w-[280px] h-[280px] rounded-full opacity-30 pointer-events-none 
          transition-transform duration-500 ease-out -translate-x-1/2 -translate-y-1/2
          ${isHovered ? 'scale-100' : 'scale-0'}
        `}
        style={{
          left: `${glowPosition.x}px`,
          top: `${glowPosition.y}px`,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <div className={`absolute inset-0 bg-[rgba(0,212,255,0.03)] opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />
      <span 
        style={{ transform: isHovered ? 'translateZ(20px)' : 'none', transition: 'transform 0.3s ease-out' }}
        className="relative z-10 flex items-center gap-3"
      >
        {children}
      </span>
    </>
  );

  const commonProps = {
    ref: buttonRef,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    className: `
      relative inline-flex items-center justify-center px-10 py-4
      cursor-pointer overflow-hidden transition-all duration-300 
      text-[14px] font-display font-bold uppercase tracking-[0.14em] rounded-xl z-20
      border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,212,255,0.4)]
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
      ${className}
    `,
    style: {
      backgroundColor: backgroundColor,
      color: isHovered ? hoverTextColor : textColor,
      boxShadow: isHovered ? `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${glowColor}1A` : 'none',
      perspective: '1000px',
      transformStyle: 'preserve-3d',
      transform: isHovered 
        ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(10px)` 
        : 'rotateX(0deg) rotateY(0deg) translateZ(0px)'
    }
  };

  if (to) {
    return (
      <Link to={to} {...commonProps}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target={target} rel={rel} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} type={type} {...commonProps}>
      {content}
    </button>
  );
};

export { HoverButton };
