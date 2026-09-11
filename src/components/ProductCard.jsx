import { ArrowUpRight, MessageCircle, Star } from "lucide-react";
import { getDiscountPercentage, shop } from "../data";

export default function ProductCard({ product, onAsk }) {
  const discount = getDiscountPercentage(
    product.actualPrice,
    product.discountPrice,
  );

  const whatsappMessage = `Hello ${shop.name}, I want to enquire about ${product.name}${
    product.model ? ` (${product.model})` : ""
  }.`;

  const whatsappUrl = `https://wa.me/${
    shop.whatsapp
  }?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl">
      {/* Product Image */}
      <button
        type="button"
        onClick={() => onAsk(product)}
        className="relative aspect-square w-full overflow-hidden bg-slate-50 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-2 top-2 flex max-w-[calc(100%-16px)] flex-wrap gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
          {product.badge && (
            <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] font-bold text-white sm:px-2.5 sm:text-xs">
              {product.badge}
            </span>
          )}

          {discount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white sm:px-2.5 sm:text-xs">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Stock */}
        <span
          className={`absolute right-2 top-2 rounded-full px-2 py-1 text-[10px] font-bold sm:right-3 sm:top-3 sm:text-xs ${
            product.stock
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {product.stock ? "In stock" : "Out of stock"}
        </span>

        {/* View indicator */}
        <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 sm:bottom-3 sm:right-3">
          <ArrowUpRight size={16} />
        </span>
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 lg:p-5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
          {product.category}
        </span>

        <h3 className="mt-1.5 line-clamp-2 text-sm font-extrabold leading-5 text-slate-900 sm:text-base sm:leading-6 lg:text-lg">
          {product.name}
        </h3>

        {product.model && (
          <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
            {product.model}
          </p>
        )}

        {/* Price */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <strong className="text-base font-black text-slate-900 sm:text-lg lg:text-xl">
            ₹{product.discountPrice.toLocaleString("en-IN")}
          </strong>

          {product.actualPrice > product.discountPrice && (
            <del className="text-[11px] text-slate-400 sm:text-xs">
              ₹{product.actualPrice.toLocaleString("en-IN")}
            </del>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-auto pt-3 sm:pt-4">
          <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
            {/* Rating */}
            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700 sm:text-sm">
              <Star size={13} fill="currentColor" />
              {product.rating}
              {product.reviewCount > 0 && (
                <span className="hidden text-[10px] font-medium text-amber-600 sm:inline">
                  ({product.reviewCount})
                </span>
              )}
            </span>

            {/* Enquiry */}
            <a
              href={product.stock ? whatsappUrl : undefined}
              target={product.stock ? "_blank" : undefined}
              rel={product.stock ? "noreferrer" : undefined}
              onClick={(e) => {
                if (!product.stock) {
                  e.preventDefault();
                  onAsk(product);
                }
              }}
              className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold transition sm:px-3 sm:text-sm ${
                product.stock
                  ? "bg-slate-900 text-white hover:bg-blue-600"
                  : "cursor-pointer bg-slate-100 text-slate-500"
              }`}
            >
              <MessageCircle size={14} />
              <span className="hidden xs:inline">Enquire</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}