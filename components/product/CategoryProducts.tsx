"use client";
import { useState } from "react";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import ProductCard from "../ProductCard";
import { CategoryProductsProps, Product } from "@/types";
import { ReactElement } from "react";

const CategoryProducts: React.FC<CategoryProductsProps> = ({
  products,
  category,
  sort,
  currentPage,
}): ReactElement => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>(sort);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const handleAddToCart = (product: Product): void => {
    console.log("Add to cart:", product);
    // Implement add to cart functionality
  };

  const handleShowLoginModal = (): void => {
    console.log("Show login modal");
    // Implement login modal functionality
  };

  const handleSortChange = (value: string): void => {
    setSortBy(value);
    // Implement sorting logic
  };

  const handleMaterialToggle = (material: string): void => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  // Mock materials for filtering
  const materials = [
    "24K Gold",
    "22K Gold",
    "18K Gold",
    "Diamond",
    "Platinum",
    "Silver",
  ];

  // Sort products based on selected sort option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
        );
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No products found</p>
            <p className="text-gray-400">
              Try adjusting your filters or check back later for new arrivals.
            </p>
            <button
              onClick={() => {
                setSelectedMaterials([]);
                setPriceRange([0, 500000]);
              }}
              className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 "
                : "space-y-6"
            }
          >
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onShowLoginModal={handleShowLoginModal}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Load More (Pagination) */}
        {sortedProducts.length > 8 && (
          <div className="mt-8 text-center">
            <button className="px-8 py-3 border border-[#196b7a] text-[#196b7a] bg-gray-100 cursor-pointer font-semibold rounded-lg hover:bg-white transition-colors">
              Load More Products...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
