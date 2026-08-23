import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  onClick
}) => {
  const sizeMap = {
    sm: { img: 'w-8 h-8', title: 'text-sm', sub: 'text-[9px]' },
    md: { img: 'w-10 h-10', title: 'text-lg', sub: 'text-[10px]' },
    lg: { img: 'w-14 h-14', title: 'text-2xl', sub: 'text-xs' },
    xl: { img: 'w-24 h-24', title: 'text-4xl', sub: 'text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center space-x-3 select-none ${onClick ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''} ${className}`}
    >
      {/* Official Brand Logo Icon */}
      <div className={`${current.img} rounded-full overflow-hidden shrink-0 border-2 border-brand-500/40 shadow-lg shadow-brand-500/20 bg-white flex items-center justify-center p-0.5`}>
        <img
          src="/logo_cabral_locacoes.png"
          alt="Cabral Locações Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${current.title} font-black italic tracking-wider text-slate-950 dark:text-white leading-none font-display uppercase`}>
            CABRAL
          </span>
          <span className={`${current.sub} font-black tracking-[0.25em] text-blue-700 dark:text-brand-cyan uppercase leading-tight mt-0.5`}>
            — LOCAÇÕES —
          </span>
        </div>
      )}
    </div>
  );
};
