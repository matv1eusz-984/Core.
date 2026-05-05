"use client";

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-black pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Premium Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </div>
  );
}
