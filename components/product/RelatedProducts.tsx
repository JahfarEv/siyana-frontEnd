'use client';
import { useRouter } from 'next/navigation';
import ProductCard from '../ProductCard';
import { RelatedProductsProps, Product } from '@/types';
import { ReactElement } from 'react';

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, currentProductId }): ReactElement | null => {
  const router = useRouter();
  
  if (products.length === 0) return null;

  const handleAddToCart = (product: Product): void => {
    // Implement add to cart functionality
    console.log('Add to cart:', product);
    // You can integrate with your cart context/store here
  };

  const handleShowLoginModal = (): void => {
    // Implement login modal functionality
    console.log('Show login modal');
    // You can trigger your login modal context here
  };

  const handleViewAllProducts = (): void => {
    if (products.length > 0) {
      // Navigate to the category of the first related product
      router.push(`/category/${products[0].category.slug}`);
    } else {
      // Fallback to all products
      router.push('/category/rings');
    }
  };

  const handleProductClick = (product: Product): void => {
    // Navigate to product detail page
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            You Might Also Like
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover more beautiful pieces from our collection
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="cursor-pointer transition-transform hover:scale-105 duration-200"
              onClick={() => handleProductClick(product)}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onShowLoginModal={handleShowLoginModal}
              />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button 
            onClick={handleViewAllProducts}
            className="inline-flex items-center px-8 py-3 border border-amber-500 text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;