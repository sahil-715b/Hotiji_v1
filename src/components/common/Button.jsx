import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 active:scale-[0.99]';

  const sizeClasses = {
    sm: 'text-xs py-2 px-4 gap-1.5',
    md: 'text-xs py-3 px-6 gap-2',
    lg: 'text-sm py-3.5 px-8 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-[#080808] text-white hover:bg-[#1C1C1C] border border-white/10 shadow-sm hover:border-white/30',
    secondary:
      'bg-transparent text-[#080808] border border-[#080808] hover:bg-[#080808] hover:text-white',
    darkSecondary:
      'bg-transparent text-white border border-[#BFC0C2]/40 hover:bg-white hover:text-black',
    whatsapp:
      'bg-[#128C7E] text-white hover:bg-[#075E54] border border-[#25D366]/30 shadow-md',
    ghost:
      'bg-transparent text-current hover:bg-black/5',
    light:
      'bg-white text-black hover:bg-[#F5F5F3] border border-[#D8D8D8] shadow-sm',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${sizeClasses[size] || sizeClasses.md}
        ${variantClasses[variant] || variantClasses.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
