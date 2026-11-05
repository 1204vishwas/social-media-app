import React from 'react';

export const AmbientGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Deep Purple Glow */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-700/25 rounded-full blur-[140px] animate-pulse-slow" />

      {/* Center-Right Vibrant Violet & Magenta Glow */}
      <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-purple-600/20 rounded-full blur-[160px] animate-float-slow" />

      {/* Bottom Light Cyan Accent Glow (Requested "light colur css also") */}
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[150px] animate-float-reverse" />

      {/* Bottom Center Deep Violet Backlight */}
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[130px]" />

      {/* Subtle Digital Grid Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />
    </div>
  );
};
