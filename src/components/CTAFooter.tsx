import { ArrowRight, Mail, MessageCircle, BookOpen } from 'lucide-react';

export function CTAFooter() {
  return (
    <footer className="bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals using AI to amplify their reach and close more deals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-105">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-lg transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40">
              Request Demo
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <span>✓ No credit card required</span>
            <span>✓ 14-day free trial</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12 pt-12 border-t border-slate-700">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Digital Twin</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">TrekEstateAgent</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Compare Plans</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Knowledge Base
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Partners</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> Contact Us
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> Community
              </a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
          <div>
            © 2025 Techtrekkers.ai. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
