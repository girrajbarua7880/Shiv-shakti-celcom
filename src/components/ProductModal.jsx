import { useEffect } from "react";
import {
  X,
  Star,
  MessageCircle,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { shop, getDiscountPercentage } from "../data";

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    if (!product) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

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
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      <div
        className="relative max-h-[94vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-4xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition hover:bg-slate-100 sm:right-4 sm:top-4"
        >
          <X size={19} />
        </button>

        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-slate-50 sm:aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            {/* Badge */}
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {product.badge && (
                <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">
                  {product.badge}
                </span>
              )}

              {discount > 0 && (
                <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="absolute bottom-4 left-4">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                  product.stock
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    product.stock ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {product.stock ? "In stock" : "Currently unavailable"}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col p-5 sm:p-7 lg:p-9">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              {product.category}
            </span>

            <h2 className="mt-2 text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
              {product.name}
            </h2>

            {product.model && (
              <p className="mt-1 text-sm font-medium text-slate-500">
                {product.model}
              </p>
            )}

            {/* Rating */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-sm font-bold text-amber-700">
                <Star size={15} fill="currentColor" />
                {product.rating}
              </span>

              <span className="text-sm text-slate-500">
                {product.reviewCount || 0} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <strong className="text-2xl font-black text-slate-900 sm:text-3xl">
                ₹{product.discountPrice.toLocaleString("en-IN")}
              </strong>

              {product.actualPrice > product.discountPrice && (
                <del className="text-sm text-slate-400">
                  ₹{product.actualPrice.toLocaleString("en-IN")}
                </del>
              )}

              {discount > 0 && (
                <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-slate-900">
                  Product details
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Benefits */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
                <PackageCheck size={17} className="text-blue-600" />
                <span className="text-xs font-semibold text-slate-600">
                  Shop pickup
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
                <ShieldCheck size={17} className="text-emerald-600" />
                <span className="text-xs font-semibold text-slate-600">
                  Trusted enquiry
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-7">
              {product.stock ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  <MessageCircle size={18} />
                  WhatsApp Enquiry
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3.5 text-sm font-bold text-slate-400"
                >
                  Currently Unavailable
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full rounded-xl px-5 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}