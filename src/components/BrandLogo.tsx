import React from 'react';

interface BrandLogoProps {
  theme?: 'paper' | 'dark';
  className?: string;
  alt?: string;
}

export default function BrandLogo({ 
  theme = 'dark', 
  className = 'w-6 h-6', 
  alt = 'Maleakhi Nymmo Logo' 
}: BrandLogoProps) {
  const logoSrc = theme === 'paper' 
    ? '/logo/icon-lightmode.svg' 
    : '/logo/icon-darkmode.svg';

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`object-contain ${className}`}
    />
  );
}
