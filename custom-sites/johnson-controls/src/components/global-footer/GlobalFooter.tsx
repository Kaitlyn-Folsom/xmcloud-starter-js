import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Twitter, Youtube, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Default: React.FC = () => {
  return (
    <footer className="bg-[#f2f2f2] text-[#333740]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        {/* Top Section: Logo, Buttons, Social, Search */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-12 lg:gap-6">
          {/* Logo - Left */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <div>
                  <Image src="https://www.johnsoncontrols.com/-/media/project/jci-global/johnson-controls/jci-common-media-library/logo/jci-logo-new-headerv1.svg?la=en&h=400&w=600&hash=CA621B3A6D1EFC69361F038D927889AB" alt="Johnson Controls" width={100} height={100} />
                </div>
                {/* Open Globe icon placeholder - would need actual SVG */}
              </div>
            </Link>
          </div>

          {/* Connect with us - Center Right */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-semibold text-primary uppercase tracking-wide">Connect with us</h3>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/company/johnson-controls"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded p-2 hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="https://www.facebook.com/JohnsonControls"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded-full p-2 hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="https://www.instagram.com/johnsoncontrols"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded-full p-2 hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="https://twitter.com/johnsoncontrols"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded p-2 hover:opacity-80 transition-opacity"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="https://www.youtube.com/user/JohnsonControls"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded p-2 hover:opacity-80 transition-opacity"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Find a Location - Right */}
          <div className="lg:col-span-4">
            <h4 className="mb-2 text-sm font-semibold text-primary uppercase tracking-wide">Find a Location</h4>
            <div className="relative">
              <Input
                type="text"
                placeholder="Type location here"
                className="w-full pr-10 bg-white text-[#333740] placeholder:text-gray-400"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 mb-12">
          <div>
          <div className="lg:col-span-2 flex flex-col gap-3">
             <Button asChild variant="default" className="bg-primary text-white hover:bg-primary/90 w-full rounded-full">
               <Link href="/contact">
                 Contact us
               </Link>
             </Button>
             <Button asChild variant="default" className="bg-primary text-white hover:bg-primary/90 w-full rounded-full">
               <Link href="/find-a-rep">
                 Find a rep
               </Link>
             </Button>
          </div>
          </div>
          {/* Products and Solutions */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary uppercase tracking-wide">Products and Solutions</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/products/building-automations-and-controls" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Building Automations and Controls
                </Link>
              </li>
              <li>
                <Link href="/products/hvac-equipment" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  HVAC Equipment
                </Link>
              </li>
              <li>
                <Link href="/products/industrial-refrigeration" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Industrial Refrigeration
                </Link>
              </li>
              <li>
                <Link href="/products/fire-detection" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Fire Detection
                </Link>
              </li>
              <li>
                <Link href="/products/fire-suppression" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Fire Suppression
                </Link>
              </li>
              <li>
                <Link href="/products/security" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/products/digital-solutions" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Digital Solutions
                </Link>
              </li>
              <li>
                <Link href="/products/residential-and-smart-home" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Residential and Smart Home
                </Link>
              </li>
              <li>
                <Link href="/products/retail-solutions" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Retail Solutions
                </Link>
              </li>
              <li>
                <Link href="/products/energy-efficiency" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Energy Efficiency
                </Link>
              </li>
              <li>
                <Link href="/products/renewable-solutions" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Renewable Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Service and Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary uppercase tracking-wide">Service and Support</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/services/service-and-support" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Service and Support
                </Link>
              </li>
              <li>
                <Link href="/services/openblue-services" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  OpenBlue Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary uppercase tracking-wide">Industries</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/industries" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Industries
                </Link>
              </li>
            </ul>
          </div>

          {/* Building Insights */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary uppercase tracking-wide">Building Insights</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/insights" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary uppercase tracking-wide">Events</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/events/trade-shows" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Trade Shows
                </Link>
              </li>
              <li>
                <Link href="/events/webinars" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Webinars
                </Link>
              </li>
            </ul>
          </div>

          {/* OpenBlue */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary uppercase tracking-wide">OpenBlue</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/openblue/what-is-openblue" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  What is OpenBlue?
                </Link>
              </li>
              <li>
                <Link href="/openblue/total-economic-impact-study" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  OpenBlue Total Economic Impact Study
                </Link>
              </li>
              <li>
                <Link href="/openblue/data-platform" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  OpenBlue Data Platform
                </Link>
              </li>
              <li>
                <Link href="/openblue/airwall" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  OpenBlue Airwall
                </Link>
              </li>
              <li>
                <Link href="/openblue/airwall-help" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  OpenBlue Airwall Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Smart Buildings */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary uppercase tracking-wide">Smart Buildings</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/smart-buildings/a-new-class-of-smart-buildings" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  A new class of smart buildings
                </Link>
              </li>
              <li>
                <Link href="/smart-buildings/net-zero-buildings" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Net Zero Buildings
                </Link>
              </li>
              <li>
                <Link href="/smart-buildings/healthy-buildings" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Healthy Buildings
                </Link>
              </li>
              <li>
                <Link href="/smart-buildings/indoor-air-quality" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Indoor Air Quality
                </Link>
              </li>
              <li>
                <Link href="/smart-buildings/digital-solutions" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Digital Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary uppercase tracking-wide">About Us</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about/our-company" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Our company
                </Link>
              </li>
              <li>
                <Link href="/about/careers" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about/media" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/about/investors" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/about/suppliers" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Suppliers
                </Link>
              </li>
              <li>
                <Link href="/about/trust-center" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Trust Center
                </Link>
              </li>
              <li>
                <Link href="/about/authorized-partners" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Authorized Partners
                </Link>
              </li>
              <li>
                <Link href="/about/sustainability" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/about/ethics-compliance" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Ethics & Compliance
                </Link>
              </li>
              <li>
                <Link href="/about/contact-us" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/about/locations" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/about/login" className="text-sm font-normal text-[#333740]/70 hover:text-[#333740] transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
        {/* Bottom Footer - Dark Blue Strip */}
      <div className="bg-primary text-white py-4 px-4 md:px-6 lg:px-8 -mx-4 md:-mx-6 lg:-mx-8">
          <div className="mx-auto max-w-7xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs font-normal text-white">
              © 2025 Johnson Controls. All Rights Reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-white">
              <Link href="/accessibility" className="hover:underline">
                Accessibility
              </Link>
              <span className="text-white/50">|</span>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <span className="text-white/50">|</span>
              <Link href="/suppliers" className="hover:underline">
                Suppliers
              </Link>
              <span className="text-white/50">|</span>
              <Link href="/your-privacy-choices" className="hover:underline">
                Your privacy choices
              </Link>
              <span className="text-white/50">|</span>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <span className="text-white/50">|</span>
              <Link href="/cookie-preferences" className="hover:underline">
                Cookie Preferences
              </Link>
            </div>
          </div>
        </div>
    </footer>
  );
};
