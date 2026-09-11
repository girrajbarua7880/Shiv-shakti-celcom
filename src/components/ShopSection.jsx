import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { products } from "../data";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function ShopSection() {
  const [showMore, setShowMore] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const visibleProducts = showMore ? products : products.slice(0, 7);

  return (
    <section
      id="shop"
      className="scroll-mt-20 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              SHOP
            </span>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Mobile accessories & more
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Explore our collection of useful mobile accessories and
              everyday essentials.
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAsk={setSelectedProduct}
            />
          ))}
        </div>

        {/* More Button */}
        {products.length > 7 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowMore((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              {showMore ? (
                <>
                  Show Less
                  <ChevronUp size={17} />
                </>
              ) : (
                <>
                  View More Products
                  <ChevronDown size={17} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}