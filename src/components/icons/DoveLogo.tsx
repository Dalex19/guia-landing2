import React from 'react';

interface DoveLogoProps {
  className?: string;
  color?: string;
}

export const DoveLogo: React.FC<DoveLogoProps> = ({ 
  className = "w-16 h-16", 
  color = "currentColor" 
}) => (
  <svg 
    viewBox="0 0 100 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M50 5C45 5 40 8 38 12C36 16 36 20 38 24C35 23 32 22 29 22C25 22 22 23 20 25C18 27 18 30 20 32C22 34 25 35 28 35C30 35 32 34 34 33C33 36 32 39 32 42C32 50 38 56 45 58L45 70C45 72 47 74 50 74C53 74 55 72 55 70L55 58C62 56 68 50 68 42C68 39 67 36 66 33C68 34 70 35 72 35C75 35 78 34 80 32C82 30 82 27 80 25C78 23 75 22 71 22C68 22 65 23 62 24C64 20 64 16 62 12C60 8 55 5 50 5Z" 
      fill={color}
    />
    <path 
      d="M50 15C48 15 46 16 46 18C46 20 48 22 50 22C52 22 54 20 54 18C54 16 52 15 50 15Z" 
      fill={color === "#F6EFE6" ? "#A55D4A" : "#F6EFE6"}
    />
  </svg>
);

export default DoveLogo;
