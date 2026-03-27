'use client';

import { useCallback, useState, memo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';
import { Button } from '../ui/button';

// Map container styles
const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '500px',
  borderRadius: '24px',
};

// Custom map styles for a clean, modern look
const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [{ lightness: 5 }],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#bae6fd' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#d4f0d4' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#e5e7eb' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

export interface ClinicLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours?: string;
  lat: number;
  lng: number;
  mapUrl?: string;
}

interface GoogleMapSectionProps {
  title?: string;
  description?: string;
  locations: ClinicLocation[];
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
}

// Default clinic locations for Saigon International Dental Clinic
const defaultLocations: ClinicLocation[] = [
  {
    id: 'district-1',
    name: 'Saigon Dental - District 1',
    address: '123 Nguyen Hue Boulevard, District 1, Ho Chi Minh City',
    phone: '1900 8089',
    hours: 'Mon-Sat: 8:00 AM - 8:00 PM',
    lat: 10.7769,
    lng: 106.7009,
    mapUrl: 'https://maps.google.com/?q=10.7769,106.7009',
  },
  {
    id: 'district-7',
    name: 'Saigon Dental - District 7',
    address: '456 Nguyen Van Linh, District 7, Ho Chi Minh City',
    phone: '1900 8089',
    hours: 'Mon-Sat: 8:00 AM - 8:00 PM',
    lat: 10.7293,
    lng: 106.7217,
    mapUrl: 'https://maps.google.com/?q=10.7293,106.7217',
  },
];

function GoogleMapSectionComponent({
  title = 'Find Us',
  description = 'Visit our conveniently located clinics across Ho Chi Minh City',
  locations = defaultLocations,
  defaultCenter,
  defaultZoom = 13,
}: GoogleMapSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<ClinicLocation | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Get API key from environment
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  // Calculate center from locations if not provided
  const center = defaultCenter || {
    lat: locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length || 10.7769,
    lng: locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length || 106.7009,
  };

  // Load Google Maps script
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    // Fit bounds to show all markers
    if (locations.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach((loc) => {
        bounds.extend({ lat: loc.lat, lng: loc.lng });
      });
      map.fitBounds(bounds, { padding: 50 });
    }
    setMap(map);
  }, [locations]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (location: ClinicLocation) => {
    setSelectedLocation(location);
    if (map) {
      map.panTo({ lat: location.lat, lng: location.lng });
      map.setZoom(15);
    }
  };

  const handleGetDirections = (location: ClinicLocation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  // Show placeholder if API key is not set
  if (!apiKey) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">{description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
            style={{ minHeight: '500px' }}
          >
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-sky-50 flex flex-col items-center justify-center p-8">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-16 h-16 text-sky-500 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Interactive Map Coming Soon</h3>
              <p className="text-slate-600 text-center max-w-md mb-6">
                Set your Google Maps API key in the environment variables to enable the interactive map.
              </p>
              <code className="bg-slate-800 text-sky-400 px-4 py-2 rounded-lg text-sm font-mono">
                NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key
              </code>
            </div>

            {/* Location Cards Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4">
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl max-w-xs"
                >
                  <h4 className="font-bold text-slate-900 mb-1">{location.name}</h4>
                  <p className="text-sm text-slate-600 mb-2">{location.address}</p>
                  <div className="flex items-center gap-2 text-sky-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">{location.phone}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Show error state
  if (loadError) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-red-600">Error loading Google Maps. Please try again later.</p>
        </div>
      </section>
    );
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
            <p className="text-xl text-slate-600">{description}</p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-sky-50 animate-pulse" style={{ minHeight: '500px' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-600">Loading map...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">{description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Location Cards */}
          <div className="lg:col-span-1 space-y-4">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleMarkerClick(location)}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 ${
                  selectedLocation?.id === location.id
                    ? 'border-sky-500 ring-2 ring-sky-200'
                    : 'border-transparent'
                }`}
              >
                <h3 className="font-bold text-lg text-slate-900 mb-3">{location.name}</h3>
                
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" />
                    <span>{location.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-sky-500 flex-shrink-0" />
                    <span className="font-medium text-slate-900">{location.phone}</span>
                  </div>
                  
                  {location.hours && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-sky-500 flex-shrink-0" />
                      <span>{location.hours}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetDirections(location);
                    }}
                    className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl flex-1"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  {location.mapUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(location.mapUrl, '_blank');
                      }}
                      className="border-sky-300 text-sky-700 hover:bg-sky-50 rounded-xl"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={defaultZoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                styles: mapStyles,
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
              }}
            >
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                  onClick={() => handleMarkerClick(location)}
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
                        <defs>
                          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0ea5e9" flood-opacity="0.3"/>
                          </filter>
                        </defs>
                        <path d="M20 0 C8.954 0 0 8.954 0 20 C0 31.046 20 50 20 50 S40 31.046 40 20 C40 8.954 31.046 0 20 0 Z" 
                              fill="#0ea5e9" filter="url(#shadow)"/>
                        <circle cx="20" cy="18" r="8" fill="white"/>
                        <circle cx="20" cy="18" r="4" fill="#0ea5e9"/>
                      </svg>
                    `),
                    scaledSize: new google.maps.Size(40, 50),
                    anchor: new google.maps.Point(20, 50),
                  }}
                />
              ))}

              {selectedLocation && (
                <InfoWindow
                  position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                  onCloseClick={() => setSelectedLocation(null)}
                  options={{
                    pixelOffset: new google.maps.Size(0, -45),
                  }}
                >
                  <div className="p-2 min-w-[200px]">
                    <h4 className="font-bold text-slate-900 mb-2">{selectedLocation.name}</h4>
                    <p className="text-sm text-slate-600 mb-2">{selectedLocation.address}</p>
                    <p className="text-sm font-medium text-sky-600">{selectedLocation.phone}</p>
                    <button
                      onClick={() => handleGetDirections(selectedLocation)}
                      className="mt-3 w-full bg-sky-500 hover:bg-sky-600 text-white text-sm py-2 px-4 rounded-lg transition-colors"
                    >
                      Get Directions
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-3 h-3 bg-sky-500 rounded-full" />
                <span>Clinic Location</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const GoogleMapSection = memo(GoogleMapSectionComponent);
