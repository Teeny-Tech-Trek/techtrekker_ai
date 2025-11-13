import { Check, Zap, Users, Clock, TrendingUp } from 'lucide-react';

export function KeyBenefits() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Techtrekkers.ai?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Empower your team with AI that works as hard as you do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">24/7 Availability</h3>
            <p className="text-slate-400">
              Your AI never sleeps, ensuring every opportunity is captured
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Personalized Interactions</h3>
            <p className="text-slate-400">
              Tailored conversations that reflect your style and expertise
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Automated Lead Management</h3>
            <p className="text-slate-400">
              Capture, qualify, and nurture leads without lifting a finger
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Seamless Engagement</h3>
            <p className="text-slate-400">
              Real estate processes automated from first contact to close
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 border border-slate-700">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Product Comparison
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white">Digital Twin</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Personal AI representation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Client relationship nurturing</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Professional presence amplification</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Intelligent Q&A handling</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white">TrekEstateAgent</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Real estate workflow automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Lead qualification engine</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Viewing scheduling automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-slate-300">Sales assistance and deal closing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
