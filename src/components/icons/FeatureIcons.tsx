import React from 'react';

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

export const BookIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
  </svg>
);

export const RosaryIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="2" />
    <circle cx="8" cy="9" r="1.5" />
    <circle cx="16" cy="9" r="1.5" />
    <circle cx="6" cy="13" r="1.5" />
    <circle cx="18" cy="13" r="1.5" />
    <circle cx="8" cy="17" r="1.5" />
    <circle cx="16" cy="17" r="1.5" />
    <path d="M12 7v3" />
    <path d="M8 10.5l1 1.5" />
    <path d="M16 10.5l-1 1.5" />
    <path d="M6 14.5l1 1" />
    <path d="M18 14.5l-1 1" />
    <path d="M8.5 18.5l2 3" />
    <path d="M15.5 18.5l-2 3" />
    <path d="M12 21.5v-1" />
  </svg>
);

export const PrayerIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
    <path d="M9 9l6 6" />
    <path d="M15 9l-6 6" />
  </svg>
);

export const ChevronRight: React.FC<IconProps> = ({ className = "w-5 h-5", strokeWidth = 2 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className = "w-5 h-5", strokeWidth = 1.5 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className = "w-5 h-5", strokeWidth = 2 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default { BookIcon, RosaryIcon, PrayerIcon, ChevronRight, DownloadIcon, MenuIcon, CloseIcon, StarIcon, CheckIcon };
