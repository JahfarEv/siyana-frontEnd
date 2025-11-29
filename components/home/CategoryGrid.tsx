// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { CATEGORIES } from '@/lib/constants/Data';
// import { ReactElement } from 'react';

// const CategoryGrid: React.FC = (): ReactElement => {
//   const router = useRouter();

//   const handleCategoryClick = (slug: string) => {
//     console.log('Navigating to category:', slug);
//     router.push(`/category/${slug}`);
//   };

//   console.log('Available categories:', CATEGORIES.map(c => ({ name: c.name, slug: c.slug })));

//   return (
//     <section className="py-8">
//       <h2 className="text-3xl font-serif text-center mb-8 text-gray-800">
//         Shop by Category
//       </h2>
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         {CATEGORIES.map((category) => (
//           <div
//             key={category.id}
//             onClick={() => handleCategoryClick(category.slug)}
//             className="relative h-60 overflow-hidden group cursor-pointer bg-gray-100 rounded-3xl"
//           >
//             <Image
//               src={category.image.url}
//               alt={category.image.alt}
//               fill
//               className="object-cover group-hover:scale-105 transition-transform duration-300"
//               sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
//             />
//             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-300 flex items-end p-4">
//               <h3 className="text-xl font-bold text-white bg-black/50 px-2 py-1 rounded">
//                 {category.name}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CategoryGrid;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants/Data";
import { ReactElement } from "react";
import { fetchCategories } from "@/lib/firebase/firebaseQueries";
import { Category } from "@/types";
const CategoryGrid: React.FC = (): ReactElement => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  // 🔥 Fetch categories using external function
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("⚠️ Category fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);
  console.log(categories, "fecth");
  const handleCategoryClick = (name: string) => {
    console.log(name)
    router.push(`/category/${name}`);
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl font-serif text-center mb-8 text-gray-800">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 ">
        {categories?.slice(0, visibleCount)?.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="relative h-60 overflow-hidden group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:scale-105"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300 flex items-end p-4">
              <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white bg-black/20 px-3 py-2 rounded-lg backdrop-blur-sm">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.productCount} products
                </p>
              </div>
            </div>

            {/* Shine Effect on Hover */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </div>
        ))}
      </div>
      {categories.length > visibleCount && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount(categories.length)}
            className="px-6 py-3 bg-black text-white rounded-xl shadow hover:bg-gray-800 transition-all font-medium"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default CategoryGrid;
