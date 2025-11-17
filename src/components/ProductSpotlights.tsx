import { useState, useEffect, useRef } from 'react';
import { User, Building2, PlayCircle, Sparkles, X } from 'lucide-react';
import digitalTwinVideo from "../Images/Orion_ Digital Twin.mp4"
import realEstateVideo from "../Images/ai agent final animation video.mp4"

export function ProductSpotlights() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoUrl: '', title: '' });
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openVideoModal = (videoUrl, title) => {
    setVideoModal({ isOpen: true, videoUrl, title });
    setIsPlaying(false);
  };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, videoUrl: '', title: '' });
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoModal.isOpen && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [videoModal.isOpen]);

  return (
    <section id='Product' className="relative bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950 px-6 lg:px-20 py-20 lg:py-32 overflow-hidden">
      
      {/* Dynamic gradient orb that follows mouse */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl transition-all duration-700 ease-out pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(14,165,233,0.4) 40%, transparent 70%)',
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
        }}
      />

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-40"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'rgba(6,182,212,0.5)',
              boxShadow: '0 0 4px rgba(6,182,212,0.8)'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20 space-y-6 animate-fade-in-up">
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight leading-tight">
            OUR FLAGSHIP<br />PRODUCTS
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Two powerful AI solutions designed to transform how you work
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Digital Twin Product */}
          <div 
            className="group relative animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 rounded-3xl blur-2xl transition-all duration-700 scale-95 group-hover:scale-105"></div>

            {/* Product Card */}
            <div className="relative bg-slate-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 lg:p-10 hover:border-cyan-500/40 transition-all duration-500 shadow-2xl overflow-hidden">
              
              {/* Animated background gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-1000"></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/50">
                  <User className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>

                {/* Title & Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
                    Digital Twin
                  </h3>
                </div>

                {/* Description */}
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  Create an AI-Powered Digital Twin that represents you professionally. Your AI persona converses with clients 24/7, nurturing leads and answering questions when you're unavailable.
                </p>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {[
                    'Personalized AI representation of your expertise',
                    'Intelligent conversations that nurture relationships',
                    'Never miss an opportunity while offline'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 group/item">
                      <Sparkles className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                      <span className="text-white/80 group-hover/item:text-white transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.open("https://digitaltwin.techtrekkers.ai/", "_blank")}
                    className="flex-1 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Know More
                  </button>

                  <button 
                    onClick={() => openVideoModal(digitalTwinVideo, 'Digital Twin Demo')}
                    className="flex-1 px-8 py-4 bg-white hover:bg-gray-50 text-blue-950 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TrekEstateAgent Product */}
          <div 
            className="group relative animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 rounded-3xl blur-2xl transition-all duration-700 scale-95 group-hover:scale-105"></div>

            {/* Product Card */}
            <div className="relative bg-slate-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 lg:p-10 hover:border-cyan-500/40 transition-all duration-500 shadow-2xl overflow-hidden">
              
              {/* Animated background gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-1000"></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-cyan-500/50">
                  <Building2 className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>

                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-4">
                  TrekEstateAgent
                </h3>

                {/* Description */}
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  AI Agents for Real Estate that work 24/7. Transform real estate sales with intelligent AI agents that automate lead capture, qualification, and act as your sales assistant.
                </p>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {[
                    'Automated lead capture and qualification',
                    'Schedule viewings and handle routine tasks',
                    'Your AI sales assistant, not replacement'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 group/item">
                      <Sparkles className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                      <span className="text-white/80 group-hover/item:text-white transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => window.open("https://estate.techtrekkers.ai/", "_blank")}
                    className="flex-1 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                    Know More
                  </button>
                  <button 
                    onClick={() => openVideoModal(realEstateVideo, 'TrekEstateAgent Demo')}
                    className="flex-1 px-8 py-4 bg-white hover:bg-gray-50 text-cyan-950 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Enhanced Video Modal */}
      {videoModal.isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeVideoModal}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>
          
          {/* Animated glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div 
            className="relative w-full max-w-6xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - Enhanced */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 z-20 w-10 h-10 bg-white/10 hover:bg-red-500/90 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 group border border-white/20"
            >
              <X className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>

            {/* Video Card */}
            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30">
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50 blur-xl"></div>
              </div>

              {/* Video Header */}
              <div className="relative bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-sm px-6 lg:px-8 py-4 border-b border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white">{videoModal.title}</h3>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-white/70 text-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>Now Playing</span>
                  </div>
                </div>
              </div>

              {/* Video Container */}
              <div className="relative bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-auto"
                  src={videoModal.videoUrl}
                  controls={false}
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
                
                {/* Custom overlay controls */}
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-pointer group/play transition-all duration-300"
                    onClick={togglePlayPause}
                  >
                    <div className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transform group-hover/play:scale-110 transition-all duration-300 shadow-2xl">
                      <PlayCircle className="w-12 h-12 text-blue-600" strokeWidth={2} />
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Video Controls Bar */}
              <div className="relative bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-sm px-6 lg:px-8 py-4 border-t border-cyan-500/20">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlayPause}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30"
                    >
                      {isPlaying ? (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                          <span className="hidden sm:inline">Pause</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span className="hidden sm:inline">Play</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-2">
                      <span className="text-white/50 text-sm">Demo Video</span>
                    </div>
                    <button
                      onClick={closeVideoModal}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/10"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </section>
  );
}