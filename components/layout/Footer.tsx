// "use client";
// import React from "react";
// import { Mail, Phone, MapPin, TrendingUp } from "lucide-react";
// import { useGoldRate } from "@/hooks/useCarousel";
// import Skeleton from "react-loading-skeleton"; // npm install react-loading-skeleton
// import 'react-loading-skeleton/dist/skeleton.css';

// interface FooterProps {}

// const Footer: React.FC<FooterProps> = () => {
//   const customerService: string[] = [
//     "Order Status",
//     "Payment & Pricing",
//     "Return & Refund",
//     "Gift Voucher",
//     "Contact us",
//     "Help",
//   ];
//   const myAccount: string[] = [
//     "My Account",
//     "Wishlist",
//     "Special",
//     "Order History",
//   ];
//   const followUs: string[] = [
//     "WhatsApp",
//     "Instagram",
//     "Twitter",
//     "Facebook",
//     "Youtube",
//   ];

//   const { data: goldRates, isLoading, isError } = useGoldRate();

//   // Convert Firestore timestamp to Date
//   const createdDate = goldRates?.createdAt
//     ? new Date(goldRates.createdAt.seconds * 1000)
//     : null;

//   return (
//     <footer className="bg-[#278899] text-white p-8 rounded-3xl m-4">
//       {/* Gold Rate Banner */}
//       <div className="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-4xl p-2 mb-8 shadow-2xl">
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           <div className="flex items-center mb-4 md:mb-0">
//             <TrendingUp className="text-white mr-3" size={24} />
//             <h3 className="text-xl font-bold text-white">
//               Today&apos;s Gold Rate
//             </h3>
//           </div>

//           <div className="flex flex-wrap justify-center gap-6 text-center">
//             {isLoading ? (
//               // Skeleton loading for gold rates
//               ["24K", "22K", "18K"].map((karat) => (
//                 <div key={karat} className="text-center">
//                   <Skeleton width={60} height={20} />
//                   <Skeleton width={40} height={16} />
//                 </div>
//               ))
//             ) : goldRates && !isError ? (
//               ["Gold_24", "Gold_22", "Gold_18"].map((karat) => (
//                 <div key={karat} className="text-center">
//                   <div className="text-lg font-bold text-white">
//                     {karat.replace("Gold_", "")}K Gold
//                   </div>
//                   <div className="text-white font-semibold">
//                     ₹{goldRates[karat]}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-white">No gold rate available</p>
//             )}
//           </div>

//           <div className="mt-4 md:mt-0 text-sm text-amber-900 font-medium bg-amber-100 px-3 py-1 rounded-full">
//             Last Updated:{" "}
//             {createdDate
//               ? createdDate.toLocaleString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "Unknown"}
//           </div>
//         </div>
//       </div>

//       {/* Footer Links */}
//       <div className="px-4 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
//         {/* Customer Service */}
//         <div>
//           <h4 className="text-lg font-bold mb-4">Customer Service</h4>
//           <ul className="space-y-2 text-sm">
//             {customerService.map((item) => (
//               <li
//                 key={item}
//                 className="hover:text-yellow-300 cursor-pointer transition-colors"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* My Account */}
//         <div>
//           <h4 className="text-lg font-bold mb-4">My Account</h4>
//           <ul className="space-y-2 text-sm">
//             {myAccount.map((item) => (
//               <li
//                 key={item}
//                 className="hover:text-yellow-300 cursor-pointer transition-colors"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Follow Us */}
//         <div>
//           <h4 className="text-lg font-bold mb-4">Follow us on</h4>
//           <ul className="space-y-2 text-sm">
//             {followUs.map((item) => (
//               <li
//                 key={item}
//                 className="hover:text-yellow-300 cursor-pointer transition-colors"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h4 className="text-lg font-bold mb-4">Contact us</h4>
//           <ul className="space-y-3 text-sm">
//             <li className="flex items-center">
//               <Phone size={16} className="mr-2" /> +91 0000000000
//             </li>
//             <li className="flex items-center">
//               <Phone size={16} className="mr-2" /> +91 0000000000
//             </li>
//             <li className="flex items-center">
//               <Mail size={16} className="mr-2" />
//               siyanagoldndiamonds@gmail.com
//             </li>
//             <li className="flex items-start">
//               <MapPin size={16} className="mt-1 mr-2 shrink-0" />
//               Vengara, Malappuram, Kerala
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="mt-8 pt-6 border-t border-teal-600 text-center text-sm text-teal-200">
//         <p>
//           &copy; {new Date().getFullYear()} Siyana Gold & Diamonds. All
//           rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;







"use client";
import React from "react";
import { Mail, Phone, MapPin, TrendingUp } from "lucide-react";
import { useGoldRate } from "@/hooks/useCarousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// 🟢 Define proper type for gold rate returned from Firestore
interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

interface GoldRate {
  id?: string;
  Gold_24?: number;
  Gold_22?: number;
  Gold_18?: number;
  createdAt?: FirestoreTimestamp;
  [key: string]: any;
}

const Footer: React.FC = () => {
  const customerService = [
    "Order Status",
    "Payment & Pricing",
    "Return & Refund",
    "Gift Voucher",
    "Contact us",
    "Help",
  ];
  const myAccount = ["My Account", "Wishlist", "Special", "Order History"];
  const followUs = ["WhatsApp", "Instagram", "Twitter", "Facebook", "Youtube"];

  // ⛳ goldRates now recognized with correct type
  const { data, isLoading, isError } = useGoldRate();
  const goldRates = data as GoldRate | null;

  const createdDate = goldRates?.createdAt
    ? new Date(goldRates.createdAt.seconds * 1000)
    : null;

  return (
    <footer className="bg-[#278899] text-white p-8 rounded-3xl m-4">
      {/* Gold Rate Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-4xl p-2 mb-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <TrendingUp className="text-white mr-3" size={24} />
            <h3 className="text-xl font-bold text-white">Today&apos;s Gold Rate</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-center">
            {isLoading ? (
              ["24K", "22K", "18K"].map((karat) => (
                <div key={karat} className="text-center">
                  <Skeleton width={60} height={20} />
                  <Skeleton width={40} height={16} />
                </div>
              ))
            ) : goldRates && !isError ? (
              ["Gold_24", "Gold_22", "Gold_18"].map((karat) => (
                <div key={karat} className="text-center">
                  <div className="text-lg font-bold text-white">
                    {karat.replace("Gold_", "")}K Gold
                  </div>
                  <div className="text-white font-semibold">
                    ₹{(goldRates as any)[karat]}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No gold rate available</p>
            )}
          </div>

          <div className="mt-4 md:mt-0 text-sm text-amber-900 font-medium bg-amber-100 px-3 py-1 rounded-full">
            Last Updated:{" "}
            {createdDate
              ? createdDate.toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Unknown"}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-4 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-bold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            {customerService.map((item) => (
              <li key={item} className="hover:text-yellow-300 cursor-pointer duration-200">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">My Account</h4>
          <ul className="space-y-2 text-sm">
            {myAccount.map((item) => (
              <li key={item} className="hover:text-yellow-300 cursor-pointer duration-200">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Follow us on</h4>
          <ul className="space-y-2 text-sm">
            {followUs.map((item) => (
              <li key={item} className="hover:text-yellow-300 cursor-pointer duration-200">
                {item}
              </li>
            ))}
          </ul>
        </div>

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
              Vengara, Malappuram, Kerala
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-teal-600 text-center text-sm text-teal-200">
        <p>&copy; {new Date().getFullYear()} Siyana Gold & Diamonds. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
