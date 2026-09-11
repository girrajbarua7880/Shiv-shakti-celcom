import { useMemo, useState } from "react";
import { Star, PenLine, ChevronDown, X } from "lucide-react";
import { reviews as initialReviews } from "../data";

const ratingOptions = [5, 4, 3, 2, 1];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(initialReviews);

  const [showForm, setShowForm] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const [selectedRating, setSelectedRating] = useState("all");

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    message: "",
  });

  /* ================================
     RATING SUMMARY
  ================================= */

  const averageRating = useMemo(() => {
    if (!reviews.length) return "0.0";

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );

    return (total / reviews.length).toFixed(1);
  }, [reviews]);


  /* ================================
     RATING COUNTS
  ================================= */

  const ratingCounts = useMemo(() => {
    return ratingOptions.reduce((result, rating) => {
      result[rating] = reviews.filter(
        (review) => Number(review.rating) === rating
      ).length;

      return result;
    }, {});
  }, [reviews]);


  /* ================================
     FILTER
  ================================= */

  const filteredReviews =
    selectedRating === "all"
      ? reviews
      : reviews.filter(
          (review) =>
            Number(review.rating) === Number(selectedRating)
        );


  /* ================================
     SHOW ONLY 3 INITIALLY
  ================================= */

  const visibleReviews = showMore
    ? filteredReviews
    : filteredReviews.slice(0, 3);


  /* ================================
     SUBMIT REVIEW
  ================================= */

  const submitReview = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.message.trim() ||
      !form.rating
    ) {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: form.name.trim(),
      rating: form.rating,
      message: form.message.trim(),
      date: "Just now",
    };

    const updatedReviews = [
      newReview,
      ...reviews,
    ];

    setReviews(updatedReviews);

    localStorage.setItem(
      "shiv-shakti-reviews",
      JSON.stringify(updatedReviews)
    );

    setForm({
      name: "",
      rating: 5,
      message: "",
    });

    setShowForm(false);
  };


  return (
    <section
      id="reviews"
      className="border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8"
    >

      <div className="mx-auto max-w-6xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 text-center">

          <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Customer Reviews
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            What our customers say
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Your feedback helps us improve our service.
          </p>

        </div>


        {/* =================================================
            TOP RATING + WRITE REVIEW
        ================================================= */}

        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">

          {/* Rating */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <div className="text-center sm:text-left">

                <div className="text-4xl font-black tracking-tight text-slate-950">
                  {averageRating}
                </div>

                <div className="mt-1 flex justify-center gap-1 text-yellow-400 sm:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {reviews.length} reviews
                </p>

              </div>


              {/* Rating Breakdown */}

              <div className="flex-1 space-y-2">

                {ratingOptions.map((rating) => {

                  const count = ratingCounts[rating] || 0;

                  const percentage =
                    reviews.length > 0
                      ? (count / reviews.length) * 100
                      : 0;

                  return (
                    <button
                      key={rating}
                      type="button"
                      onClick={() =>
                        setSelectedRating(
                          selectedRating === rating
                            ? "all"
                            : rating
                        )
                      }
                      className={`
                        group flex w-full items-center gap-2
                        rounded-lg px-2 py-1
                        text-left transition
                        ${
                          selectedRating === rating
                            ? "bg-slate-100"
                            : "hover:bg-slate-50"
                        }
                      `}
                    >

                      <span className="w-10 text-[11px] font-semibold text-slate-600">
                        {rating} ★
                      </span>

                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-yellow-400 transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                      <span className="w-5 text-right text-[10px] text-slate-400">
                        {count}
                      </span>

                    </button>
                  );
                })}

              </div>

            </div>

          </div>


          {/* Write Review */}

          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 lg:w-52">

            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-950
                px-5
                py-3
                text-sm
                font-bold
                text-white
                transition
                hover:bg-slate-800
              "
            >

              {showForm ? (
                <>
                  <X size={16} />
                  Close
                </>
              ) : (
                <>
                  <PenLine size={16} />
                  Write a Review
                </>
              )}

            </button>

          </div>

        </div>


        {/* =================================================
            REVIEW FORM — UPPER
        ================================================= */}

        {showForm && (

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5">

              <h3 className="text-xl font-black text-slate-950">
                Write a Review
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Share your experience with Shiv Shakti Cellcome.
              </p>

            </div>


            <form
              onSubmit={submitReview}
              className="space-y-5"
            >

              {/* Name */}

              <div>

                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Your Name
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter your name"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-slate-400
                    focus:bg-white
                  "
                />

              </div>


              {/* Rating */}

              <div>

                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Your Rating
                </label>

                <div className="flex gap-2">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          rating: star,
                        })
                      }
                      className="transition hover:scale-110"
                    >

                      <Star
                        size={27}
                        className={
                          star <= form.rating
                            ? "text-yellow-400"
                            : "text-slate-300"
                        }
                        fill={
                          star <= form.rating
                            ? "currentColor"
                            : "none"
                        }
                      />

                    </button>

                  ))}

                </div>

              </div>


              {/* Message */}

              <div>

                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Your Review
                </label>

                <textarea
                  required
                  rows={4}
                  maxLength={500}
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  placeholder="Tell us about your experience..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-slate-400
                    focus:bg-white
                  "
                />

              </div>


              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-slate-950
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-slate-800
                "
              >
                Submit Review
              </button>

            </form>

          </div>

        )}


        {/* =================================================
            ACTIVE FILTER
        ================================================= */}

        {selectedRating !== "all" && (

          <div className="mb-5 flex items-center justify-between">

            <p className="text-xs font-semibold text-slate-600">
              Showing {selectedRating}-star reviews
            </p>

            <button
              type="button"
              onClick={() => setSelectedRating("all")}
              className="text-xs font-bold text-blue-600"
            >
              Clear Filter
            </button>

          </div>

        )}


        {/* =================================================
            REVIEWS
        ================================================= */}

        {visibleReviews.length > 0 ? (

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {visibleReviews.map((review) => (

              <article
                key={review.id}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  transition
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div className="
                      grid
                      h-10
                      w-10
                      place-items-center
                      rounded-full
                      bg-slate-100
                      text-sm
                      font-black
                      text-slate-700
                    ">
                      {review.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>

                      <h3 className="text-sm font-bold text-slate-900">
                        {review.name}
                      </h3>

                      <p className="text-[10px] text-slate-400">
                        {review.date || "Customer"}
                      </p>

                    </div>

                  </div>


                  <div className="flex gap-0.5 text-yellow-400">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <Star
                        key={star}
                        size={14}
                        fill={
                          star <= review.rating
                            ? "currentColor"
                            : "none"
                        }
                      />

                    ))}

                  </div>

                </div>


                <p className="mt-4 text-xs leading-6 text-slate-600">
                  "{review.message}"
                </p>

              </article>

            ))}

          </div>

        ) : (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">

            <p className="text-sm font-semibold text-slate-700">
              No reviews found
            </p>

            <button
              type="button"
              onClick={() => setSelectedRating("all")}
              className="mt-2 text-xs font-bold text-blue-600"
            >
              Show all reviews
            </button>

          </div>

        )}


        {/* =================================================
            SEE MORE
        ================================================= */}

        {filteredReviews.length > 3 && (

          <div className="mt-7 flex justify-center">

            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5
                py-3
                text-xs
                font-bold
                text-slate-700
                transition
                hover:bg-slate-100
              "
            >

              {showMore
                ? "Show Less"
                : `See More Reviews (${filteredReviews.length - 3})`}

              <ChevronDown
                size={15}
                className={
                  showMore
                    ? "rotate-180 transition"
                    : "transition"
                }
              />

            </button>

          </div>

        )}

      </div>

    </section>
  );
}