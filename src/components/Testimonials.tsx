import { Star, ChevronLeft, ChevronRight, Award, Shield, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Real Estate Broker",
    company: "Premium Properties",
    content: "My Digital Twin has transformed how I engage with clients. It handles initial inquiries while I focus on closing deals. Response time has improved by 300%.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Senior Agent",
    company: "Urban Realty Group",
    content: "TrekEstateAgent is like having a full-time assistant who never sleeps. Lead qualification is now automatic, and I'm closing 40% more deals per quarter.",
    rating: 5
  },
  {
    name: "Emily Thompson",
    role: "Property Consultant",
    company: "Elite Estates",
    content: "The AI perfectly captures my communication style. Clients can't tell they're speaking with my Digital Twin until I mention it. Absolutely game-changing.",
    rating: 5
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their workflow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-slate-400">Active Agents</div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 text-center">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">2M+</div>
            <div className="text-slate-400">Leads Processed</div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <div className="text-slate-400">Uptime Guarantee</div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 border border-slate-700">
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-slate-300 text-center mb-8 leading-relaxed">
              "{testimonials[currentIndex].content}"
            </blockquote>

            <div className="text-center">
              <div className="font-bold text-white text-lg">{testimonials[currentIndex].name}</div>
              <div className="text-slate-400">{testimonials[currentIndex].role}</div>
              <div className="text-blue-400 text-sm">{testimonials[currentIndex].company}</div>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center border border-slate-700 transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center border border-slate-700 transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-500 w-8' : 'bg-slate-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
