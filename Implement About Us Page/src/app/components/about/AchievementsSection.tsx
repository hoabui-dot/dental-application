import { Award, Users, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AchievementsSection() {
  return (
    <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1691068765153-4de8f11b6c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2VydGlmaWNhdGUlMjBhd2FyZHxlbnwxfHx8fDE3NzQzNDA3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Achievements and certifications"
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Floating achievement badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-sky-100 p-3 rounded-xl">
                  <Award className="w-8 h-8 text-sky-600" />
                </div>
                <div>
                  <p className="text-2xl text-slate-900">2024</p>
                  <p className="text-sm text-slate-600">Excellence Award</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 bg-sky-100 rounded-full mb-4">
                <span className="text-sky-600 font-medium">Our Achievements</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
                Recognized Excellence in Dental Care
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We are proud to be recognized as a leading dental clinic in Southeast Asia, 
                with hundreds of successful implant and orthodontic cases each year.
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-sky-100 p-3 rounded-xl">
                  <Award className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">International Certifications</h3>
                  <p className="text-slate-600">
                    Accredited by leading international dental organizations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-sky-100 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">Advanced Implant Technology</h3>
                  <p className="text-slate-600">
                    State-of-the-art equipment for precise and minimally invasive procedures
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-sky-100 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">Thousands of Satisfied Patients</h3>
                  <p className="text-slate-600">
                    Building lasting relationships through exceptional care and results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
