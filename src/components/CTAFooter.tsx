import { ArrowRight, Mail, Sparkles, Bot } from 'lucide-react';

export function CTAFooter() {
  return (
    <footer className="relative bg-slate-950">
      {/* Final CTA Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl border border-cyan-500/30 mb-10">
            <Sparkles className="w-10 h-10 text-cyan-400" />
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Transform Your Business
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Starting Today
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join 10,000+ professionals leveraging AI to amplify their reach, 
            automate operations, and close more deals than ever before.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-12">
            <button className="group relative px-12 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xl font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)]">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start Free Trial
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <button className="px-12 py-6 bg-slate-900/50 hover:bg-slate-800/50 backdrop-blur-xl border-2 border-slate-800 hover:border-cyan-500/50 text-white text-xl font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3">
              <Mail className="w-6 h-6" />
              Talk to Sales
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-slate-500">
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-400 font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-400 font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-400 font-medium">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Techtrekkers.ai Branding Bar */}
      <div className="relative border-t border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-40"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Bot className="w-9 h-9 text-white" strokeWidth={2} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Techtrekkers<span className="text-cyan-400">.ai</span>
                </h3>
                <p className="text-sm text-slate-500 font-medium">Intelligent Business Automation</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-8 lg:gap-12">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">10K+</div>
                <div className="text-xs text-slate-500 font-medium">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">2M+</div>
                <div className="text-xs text-slate-500 font-medium">Leads Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">99.9%</div>
                <div className="text-xs text-slate-500 font-medium">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">24/7</div>
                <div className="text-xs text-slate-500 font-medium">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Products */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                Products
              </h4>
              <ul className="space-y-3.5">
                {['Digital Twin', 'TrekEstateAgent', 'Pricing', 'Enterprise', 'Compare'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium inline-flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-1.5 h-1.5 bg-cyan-400 rounded-full transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                Resources
              </h4>
              <ul className="space-y-3.5">
                {['Documentation', 'API Reference', 'Case Studies', 'Blog', 'Guides'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium inline-flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-1.5 h-1.5 bg-cyan-400 rounded-full transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                Company
              </h4>
              <ul className="space-y-3.5">
                {['About Us', 'Careers', 'Partners', 'Press Kit', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium inline-flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-1.5 h-1.5 bg-cyan-400 rounded-full transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                Support
              </h4>
              <ul className="space-y-3.5">
                {['Help Center', 'Community', 'System Status', 'Security', 'FAQs'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium inline-flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-1.5 h-1.5 bg-cyan-400 rounded-full transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              © 2025 <span className="text-cyan-400 font-semibold">Techtrekkers.ai</span>. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center gap-8">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm font-medium">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm font-medium">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm font-medium">
                Cookie Policy
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {['twitter', 'linkedin', 'github'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 rounded-xl flex items-center justify-center transition-all duration-300 group"
                >
                  <span className="text-slate-400 group-hover:text-cyan-400 text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> c8b923e6e2556401ed07dbf5decffb811f26c59b
