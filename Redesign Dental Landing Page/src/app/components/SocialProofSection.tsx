import { Star, TrendingUp, Shield, Heart } from 'lucide-react';

export function SocialProofSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-sky-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">50,000+</div>
            <p className="text-gray-600">Patients Treated</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-sky-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
            <p className="text-gray-600">Success Rate</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-sky-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">20+</div>
            <p className="text-gray-600">Years Experience</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-sky-600 fill-sky-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
            <p className="text-gray-600">Google Reviews</p>
          </div>
        </div>

        {/* Testimonials Preview */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600">
              See what our patients say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-sky-50 rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The best dental experience I've ever had. Professional, caring, and absolutely painless!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-200 rounded-full"></div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Verified Patient</div>
                </div>
              </div>
            </div>

            <div className="bg-sky-50 rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Amazing results! My smile transformation exceeded all expectations. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-200 rounded-full"></div>
                <div>
                  <div className="font-semibold text-gray-900">Michael Chen</div>
                  <div className="text-sm text-gray-600">Verified Patient</div>
                </div>
              </div>
            </div>

            <div className="bg-sky-50 rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "State-of-the-art facility with incredibly skilled doctors. My kids actually enjoy going!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-200 rounded-full"></div>
                <div>
                  <div className="font-semibold text-gray-900">Emily Rodriguez</div>
                  <div className="text-sm text-gray-600">Verified Patient</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
