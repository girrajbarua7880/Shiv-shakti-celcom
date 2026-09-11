import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  const rating = Number(review.rating) || 0;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        
        <div className="flex min-w-0 items-center gap-3">
          
          {/* Avatar */}
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
            {review.name?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900">
              {review.name}
            </h3>

            <p className="mt-0.5 text-[10px] text-slate-400">
              {review.date || "Customer"}
            </p>
          </div>

        </div>

        {/* Rating */}
        <div className="flex shrink-0 items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              className={
                star <= rating
                  ? "text-yellow-400"
                  : "text-slate-200"
              }
              fill={
                star <= rating
                  ? "currentColor"
                  : "none"
              }
            />
          ))}
        </div>

      </div>

      {/* Message */}
      <p className="mt-4 text-sm leading-6 text-slate-600">
        "{review.message}"
      </p>

    </article>
  );
}