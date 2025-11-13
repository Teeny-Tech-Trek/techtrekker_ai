import { User, Building2, PlayCircle, Sparkles } from 'lucide-react';

export function ProductSpotlights() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Flagship Products
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Two powerful AI solutions designed to transform how you work
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <User className="w-8 h-8 text-white" />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-3xl font-bold text-white">Digital Twin</h3>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">PropTr</span>
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">
                Create an AI-Powered Digital Twin that represents you professionally.
                Your AI persona converses with clients 24/7, nurturing leads and
                answering questions when you're unavailable.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Personalized AI representation of your expertise</span>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Intelligent conversations that nurture relationships</span>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Never miss an opportunity while offline</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  Create Your Twin
                </button>
                <button className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">TrekEstateAgent</h3>

              <p className="text-slate-300 mb-6 leading-relaxed">
                AI Agents for Real Estate that work 24/7. Transform real estate
                sales with intelligent AI agents that automate lead capture,
                qualification, and act as your sales assistant.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Automated lead capture and qualification</span>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Schedule viewings and handle routine tasks</span>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Your AI sales assistant, not replacement</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  Get Started Free
                </button>
                <button className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
