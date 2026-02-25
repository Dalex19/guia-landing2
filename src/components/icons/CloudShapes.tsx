import React from 'react';

interface CloudProps {
  className?: string;
  opacity?: number;
}

export const Cloud1: React.FC<CloudProps> = ({ className = "", opacity = 0.18 }) => (
  <svg 
    viewBox="0 0 200 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ opacity }}
  >
    <path 
      d="M20 70C20 55 32 43 47 43C50 43 53 44 56 45C60 30 74 20 90 20C108 20 123 32 127 48C130 47 133 47 136 47C158 47 175 64 175 85C175 88 174 91 173 94H27C23 88 20 79 20 70Z" 
      fill="currentColor"
    />
  </svg>
);

export const Cloud2: React.FC<CloudProps> = ({ className = "", opacity = 0.12 }) => (
  <svg 
    viewBox="0 0 160 80" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ opacity }}
  >
    <path 
      d="M15 60C15 48 25 38 38 38C40 38 43 39 45 40C48 28 60 20 73 20C87 20 99 29 102 42C104 41 107 41 109 41C127 41 141 55 141 72C141 74 140 77 139 79H21C18 74 15 67 15 60Z" 
      fill="currentColor"
    />
  </svg>
);

export const Cloud3: React.FC<CloudProps> = ({ className = "", opacity = 0.15 }) => (
  <svg 
    viewBox="0 0 120 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ opacity }}
  >
    <path 
      d="M10 45C10 35 18 27 29 27C31 27 33 28 35 29C38 19 47 13 58 13C70 13 80 21 82 31C84 31 86 30 88 30C102 30 113 41 113 54C113 56 112 58 112 60H15C12 56 10 50 10 45Z" 
      fill="currentColor"
    />
  </svg>
);

export default { Cloud1, Cloud2, Cloud3 };
