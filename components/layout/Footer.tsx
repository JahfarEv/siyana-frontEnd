import React from 'react';
import { Mail, Phone, MapPin, TrendingUp } from 'lucide-react';
import { GoldRate } from '@/types';

const Footer: React.FC = () => {
  const customerService: string[] = ['Order Status', 'Payment & Pricing', 'Return & Refund', 'Gift Voucher', 'Contact us', 'Help'];
  const myAccount: string[] = ['My Account', 'Wishlist', 'Special', 'Order History'];
  const followUs: string[] = ['WhatsApp', 'Instagram', 'Twitter', 'Facebook', 'Youtube'];

  const goldRates: GoldRate = {
    '24K': '₹6,450/g',
    '22K': '₹5,910/g', 
    '18K': '₹4,840/g'
  };

  return (
    <footer className="bg-[#278899] text-white p-8 rounded-3xl m-4">
      {/* Gold Rate Banner */}
      <div className="bg-linear-to-r from-amber-500 to-yellow-400 rounded-4xl p-2 mb-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <TrendingUp className="text-white mr-3" size={24} />
            <h3 className="text-xl font-bold text-white">Today&apos;s Gold Rate</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {Object.entries(goldRates).map(([karat, price]) => (
              <div key={karat} className="text-center">
                <div className="text-lg font-bold text-white">{karat} Gold</div>
                <div className="text-white font-semibold">{price}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 md:mt-0 text-sm text-amber-900 font-medium bg-amber-100 px-3 py-1 rounded-full">
            Last Updated: Today
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1: Customer Service */}
        <div>
          <h4 className="text-lg font-bold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            {customerService.map((item) => (
              <li key={item} className="hover:text-yellow-300 cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: My Account */}
        <div>
          <h4 className="text-lg font-bold mb-4">My Account</h4>
          <ul className="space-y-2 text-sm">
            {myAccount.map((item) => (
              <li key={item} className="hover:text-yellow-300 cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Follow us on */}
        <div>
          <h4 className="text-lg font-bold mb-4">Follow us on</h4>
          <ul className="space-y-2 text-sm">
            {followUs.map((item) => (
              <li key={item} className="hover:text-yellow-300 cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contacts us */}
        <div>
          <h4 className="text-lg font-bold mb-4">Contact us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <Phone size={16} className="mr-2" /> +91 0000000000
            </li>
            <li className="flex items-center">
              <Phone size={16} className="mr-2" /> +91 0000000000
            </li>
            <li className="flex items-center">
              <Mail size={16} className="mr-2" />
              siyanagoldndiamonds@gmail.com
            </li>
            <li className="flex items-start">
              <MapPin size={16} className="mt-1 mr-2 shrink-0" />
              vengara, malappuram, kerala
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-6 border-t border-teal-600 text-center text-sm text-teal-200">
        <p>&copy; {new Date().getFullYear()} Siyana Gold & Diamonds. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;