import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Award, GraduationCap } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Sarah Chen',
    specialty: 'Cosmetic Dentistry',
    experience: '15 years',
    education: 'Harvard School of Dental Medicine',
    image: 'https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkZW50aXN0JTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0MTA3NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Dr. James Wilson',
    specialty: 'Oral Surgery',
    experience: '20 years',
    education: 'Stanford University',
    image: 'https://images.unsplash.com/photo-1631596577204-53ad0d6e6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGVudGlzdCUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDA4MzUyNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Dr. Maria Rodriguez',
    specialty: 'Pediatric Dentistry',
    experience: '12 years',
    education: 'Columbia University',
    image: 'https://images.unsplash.com/photo-1758205308181-d52b41e00cef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGRlbnRpc3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc0MTA3NTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function DoctorsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50" id="doctors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Board-certified professionals dedicated to your dental health
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <ImageWithFallback
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-4 h-4 text-sky-600" />
                    <span className="text-sm font-semibold text-gray-900">{doctor.experience}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-sky-600 font-semibold mb-4">{doctor.specialty}</p>
                
                <div className="flex items-start gap-2 mb-6 text-gray-600">
                  <GraduationCap className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{doctor.education}</span>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-sky-200 text-sky-600 hover:bg-sky-50 rounded-full"
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
