// 'use client';
// import { useState, useEffect, ReactElement } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { Search, Filter, Grid, List } from 'lucide-react';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
// import ProductCard from '@/components/ProductCard';
// import { FEATURED_PRODUCTS } from '@/lib/constants/Data';
// import { Product } from '@/types';
// import NavbarWrapper from '@/components/layout/NavbarWrapper';
// import Link from 'next/link';


// export default function SearchPage(): ReactElement {
//   const searchParams = useSearchParams();
//   const query = searchParams.get('q') || '';
//   const category = searchParams.get('category') || '';
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate API call
//     setLoading(true);
//     setTimeout(() => {
//       setProducts(FEATURED_PRODUCTS);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     let results = products;

//     // Filter by search query
//     if (query) {
//       results = results.filter(product =>
//         product.name.toLowerCase().includes(query.toLowerCase()) ||
//         product.description.toLowerCase().includes(query.toLowerCase()) ||
//         product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
//       );
//     }

//     // Filter by category
//     if (category) {
//       results = results.filter(product =>
//         product.category.slug === category
//       );
//     }

//     // Filter by price range
//     results = results.filter(product =>
//       product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     // Sort results
//     results = [...results].sort((a, b) => {
//       switch (sortBy) {
//         case 'price':
//           return a.price - b.price;
//         case 'rating':
//           return b.rating - a.rating;
//         default:
//           return a.name.localeCompare(b.name);
//       }
//     });

//     setFilteredProducts(results);
//   }, [products, query, category, sortBy, priceRange]);

//   const addToCart = (product: Product): void => {
//     // Implement add to cart functionality
//     console.log('Add to cart:', product);
//   };

//   const showLoginModal = (): void => {
//     // Implement login modal
//     console.log('Show login modal');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//               <NavbarWrapper/>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Searching products...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <NavbarWrapper />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Search Header */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {query ? `Search Results for "${query}"` : 'All Products'}
//               </h1>
//               <p className="text-gray-600">
//                 Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
//                 {query && ` for "${query}"`}
//               </p>
//             </div>

//             <div className="flex items-center gap-4">
//               {/* View Mode Toggle */}
//               <div className="flex border border-gray-300 rounded-lg">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 ${viewMode === 'grid' ? 'bg-amber-500 text-white' : 'text-gray-600'}`}
//                 >
//                   <Grid className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 ${viewMode === 'list' ? 'bg-amber-500 text-white' : 'text-gray-600'}`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Sort Dropdown */}
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value as any)}
//                 className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
//               >
//                 <option value="name">Sort by Name</option>
//                 <option value="price">Sort by Price</option>
//                 <option value="rating">Sort by Rating</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-12">
//             <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
//             <p className="text-gray-600 mb-8">
//               Try adjusting your search criteria or browse our categories.
//             </p>
//             <Link
//               href="/category/rings"
//               className="inline-flex items-center px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
//             >
//               Browse Categories
//             </Link>
//           </div>
//         ) : (
//           <div className={
//             viewMode === 'grid' 
//               ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
//               : 'space-y-6'
//           }>
//             {filteredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onAddToCart={addToCart}
//                 onShowLoginModal={showLoginModal}
//                 viewMode={viewMode}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }





import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

type SearchPageProps = {
  searchParams: {
    q?: string;
    category?: string;
  };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50">Loading...</div>}>
      <SearchPageClient searchParams={searchParams} />
    </Suspense>
  );
}
