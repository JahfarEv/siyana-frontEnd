import { Metadata } from 'next';
import { Award, Users, Shield, Heart } from 'lucide-react';
import NavbarWrapper from '@/components/layout/NavbarWrapper';
import Footer from '@/components/layout/Footer';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'About Us - Siyana Gold & Diamonds',
  description: 'Learn about Siyana Gold & Diamonds - Your trusted partner for premium jewelry since 1995. Quality, trust, and excellence.',
  keywords: ['about siyana', 'jewelry store', 'gold diamonds', 'premium jewelry'],
};

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We use only the finest materials and craftsmanship in every piece of jewelry.'
  },
  {
    icon: Shield,
    title: 'Trust & Authenticity',
    description: 'Every piece comes with certification and lifetime warranty for your peace of mind.'
  },
  {
    icon: Users,
    title: 'Expert Craftsmanship',
    description: 'Our skilled artisans bring decades of experience to create exquisite designs.'
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We offer personalized service and support.'
  }
];

export default function AboutPage(): ReactElement {
  return (
    <div className="min-h-screen bg-white">
      <NavbarWrapper />
      
      {/* Hero Section */}
      <section className="bg-linear-to-r from-amber-500 to-yellow-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About Siyana Gold & Diamonds</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Your trusted partner for premium jewelry since 1995. Crafting memories that last a lifetime.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 1995, Siyana Gold & Diamonds began as a small family-owned jewelry store 
                in the heart of Kerala. With a passion for exquisite craftsmanship and a commitment 
                to quality, we&apos;ve grown to become one of the most trusted names in premium jewelry.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                For over two decades, we&apos;ve been helping our customers celebrate life&apos;s most precious 
                moments with beautifully crafted jewelry that tells their unique stories.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">25+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">10K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">100%</div>
                  <div className="text-gray-600">Authentic Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">24/7</div>
                  <div className="text-gray-600">Customer Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/about-store.jpg"
                alt="Siyana Gold & Diamonds Store"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Siyana?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to providing you with the finest jewelry shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                To create timeless jewelry that celebrates your special moments while maintaining 
                the highest standards of quality, craftsmanship, and ethical practices.
              </p>
              <p className="text-lg text-gray-700">
                We believe that every piece of jewelry should tell a story and be crafted with 
                the same care and attention we would want for our own family.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 mb-6">
                To be the most trusted and preferred jewelry destination, known for our 
                exceptional quality, innovative designs, and unparalleled customer service.
              </p>
              <p className="text-lg text-gray-700">
                We strive to make luxury accessible while preserving the artistry and tradition 
                of fine jewelry craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}