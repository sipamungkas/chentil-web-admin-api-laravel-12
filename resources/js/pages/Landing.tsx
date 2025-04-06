import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { Calendar, Download, MapPin, Palmtree, Sparkles, UtensilsCrossed, Waves } from 'lucide-react';
import { Link } from '@inertiajs/react';

// Color scheme
const colors = {
  // Background colors
  background: {
    primary: '#FFF7FF',
    secondary: '#FFF3FC',
    tertiary: '#FFEEF9',
  },
  
  // Text colors
  text: {
    primary: '#1A202C',
    secondary: '#4A5568',
    tertiary: '#718096',
    inverse: '#FFFFFF',
  },
  
  // Brand colors
  brand: {
    primary: '#DF5188',
    secondary: '#F19CBB',
    accent: '#F6ACEC',
  },
  
  // Status colors
  status: {
    success: '#F5A4C8',
    error: '#F05F80',
    warning: '#F18988',
    info: '#F6A1B6',
  },
  
  // Border colors
  border: {
    light: '#F4C2C1',
    medium: '#F8ABA0',
    dark: '#F7B8C6',
  },
  
  // Overlay colors
  overlay: {
    light: 'rgba(223, 81, 136, 0.1)',
    medium: 'rgba(223, 81, 136, 0.5)',
    dark: 'rgba(223, 81, 136, 0.8)',
  },

  // Additional Chentil palette colors
  chentil: {
    rosePink: '#E16FAB',
    creamy: '#F06AA8',
    bubbleGum: '#EF5EA2',
    thulian: '#E070A2',
    watermelon: '#F3809D',
    punch: '#EB5679',
    frenchRose: '#EF4B8A',
    cerise: '#DE3064',
    hotPink: '#ED2690',
    ruby: '#E01861',
  },
};

// Feature data
const features = [
  {
    title: 'Discover Destinations',
    description: 'Explore beautiful destinations across the region with detailed information and stunning visuals.',
    icon: MapPin,
    color: colors.chentil.rosePink,
  },
  {
    title: 'Cultural Heritage',
    description: 'Learn about the rich cultural heritage and traditions that make each destination unique.',
    icon: Palmtree,
    color: colors.chentil.creamy,
  },
  {
    title: 'Food & Beverages',
    description: 'Discover local culinary delights and beverages that define the region\'s food culture.',
    icon: UtensilsCrossed,
    color: colors.chentil.bubbleGum,
  },
  {
    title: 'Outbound Experiences',
    description: 'Plan your outbound adventures with comprehensive guides and recommendations.',
    icon: Waves,
    color: colors.chentil.thulian,
  },
  {
    title: 'Event Calendar',
    description: 'Stay updated with local events and festivals through our interactive calendar.',
    icon: Calendar,
    color: colors.chentil.watermelon,
  },
  {
    title: 'Personalized Recommendations',
    description: 'Get tailored recommendations based on your interests and preferences.',
    icon: Sparkles,
    color: colors.chentil.punch,
  },
];

export default function Landing() {
  return (
    <>
      <Head title="Chentil - Discover Your Next Adventure" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: colors.background.primary }}>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full" style={{ background: `radial-gradient(circle at 20% 30%, ${colors.overlay.light}, transparent 70%)` }}></div>
          <div className="absolute bottom-0 right-0 w-full h-full" style={{ background: `radial-gradient(circle at 80% 70%, ${colors.overlay.light}, transparent 70%)` }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: colors.text.primary }}>
                Discover Your Next <span style={{ color: colors.brand.primary }}>Adventure</span>
              </h1>
              <p className="text-lg md:text-xl mb-8" style={{ color: colors.text.secondary }}>
                Explore destinations, cultural heritage, local cuisine, and events all in one place. Your journey begins here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="px-6 py-3 text-lg font-medium" 
                  style={{ 
                    backgroundColor: colors.brand.primary,
                    color: colors.text.inverse,
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  className="px-6 py-3 text-lg font-medium"
                  style={{ 
                    borderColor: colors.brand.primary,
                    color: colors.brand.primary,
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full" style={{ backgroundColor: colors.brand.secondary, opacity: 0.3 }}></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full" style={{ backgroundColor: colors.brand.accent, opacity: 0.3 }}></div>
                <img 
                  src="/images/hero-image.png" 
                  alt="Chentil App" 
                  className="w-full max-w-md rounded-lg shadow-xl"
                  style={{ border: `4px solid ${colors.border.light}` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: colors.background.secondary }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text.primary }}>
              Explore Our Features
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.text.secondary }}>
              Discover all the tools and resources available to enhance your travel experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: colors.background.primary,
                  border: `1px solid ${colors.border.light}`,
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: colors.text.inverse }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text.primary }}>
                  {feature.title}
                </h3>
                <p style={{ color: colors.text.secondary }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* App Download Section */}
      <section className="py-20" style={{ backgroundColor: colors.background.tertiary }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text.primary }}>
                Take Chentil With You
              </h2>
              <p className="text-lg mb-6" style={{ color: colors.text.secondary }}>
                Download our Android app to access all features on the go. Plan your trips, discover new places, and stay updated with local events wherever you are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="px-6 py-3 text-lg font-medium flex items-center gap-2" 
                  style={{ 
                    backgroundColor: colors.brand.primary,
                    color: colors.text.inverse,
                  }}
                >
                  <Download className="w-5 h-5" />
                  Download Android App
                </Button>
              </div>
              <p className="mt-4 text-sm" style={{ color: colors.text.tertiary }}>
                Available for Android 8.0 and above
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full" style={{ backgroundColor: colors.brand.accent, opacity: 0.3 }}></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full" style={{ backgroundColor: colors.brand.secondary, opacity: 0.3 }}></div>
                <img 
                  src="/images/app-mockup.png" 
                  alt="Chentil Android App" 
                  className="w-full max-w-md rounded-lg shadow-xl"
                  style={{ border: `4px solid ${colors.border.medium}` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: colors.background.primary }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text.primary }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: colors.text.secondary }}>
            Join thousands of travelers who have discovered new destinations and experiences with Chentil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="px-6 py-3 text-lg font-medium" 
              style={{ 
                backgroundColor: colors.brand.primary,
                color: colors.text.inverse,
              }}
            >
              Get Started Now
            </Button>
            <Button 
              variant="outline" 
              className="px-6 py-3 text-lg font-medium"
              style={{ 
                borderColor: colors.brand.primary,
                color: colors.brand.primary,
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: colors.background.secondary }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold" style={{ color: colors.brand.primary }}>Chentil</h3>
              <p className="mt-2" style={{ color: colors.text.secondary }}>
                Discover your next adventure
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div>
                <h4 className="font-semibold mb-3" style={{ color: colors.text.primary }}>Features</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Destinations</Link></li>
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Cultural Heritage</Link></li>
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Food & Beverages</Link></li>
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Events</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3" style={{ color: colors.text.primary }}>Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Blog</Link></li>
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Guides</Link></li>
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Support</Link></li>
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3" style={{ color: colors.text.primary }}>Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Terms of Service</Link></li>
                  <li><Link href="#" className="hover:underline" style={{ color: colors.text.secondary }}>Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: colors.border.light }}>
            <p style={{ color: colors.text.tertiary }}>
              &copy; {new Date().getFullYear()} Chentil. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
} 