import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  PenLine,
  Star,
  X,
} from "lucide-react";

import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

import { reviews as initialReviews } from "../../data";


export default function ReviewSection() {

  /* =====================================================
     REVIEWS
  ===================================================== */

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "shiv-shakti-reviews"
      );

      return saved
        ? JSON.parse(saved)
        : initialReviews;
    } catch {
      return initialReviews;
    }
  });


  /* =====================================================
     STATES
  ===================================================== */

  const [showMore, setShowMore] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [selectedRating, setSelectedRating] =
    useState("all");


  /* =====================================================
     SAVE REVIEWS
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "shiv-shakti-reviews",
      JSON.stringify(reviews)
    );
  }, [reviews]);


  /* =====================================================
     AVERAGE RATING
  ===================================================== */

  const averageRating = useMemo(() => {

    if (!reviews.length) {
      return "0.0";
    }

    const total = reviews.reduce(
      (sum, review) =>
        sum + Number(review.rating || 0),
      0
    );

    return (total / reviews.length).toFixed(1);

  }, [reviews]);


  /* =====================================================
     RATING COUNTS
  ===================================================== */

  const ratingCounts = useMemo(() => {

    const counts = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((review) => {
      const rating = Number(review.rating);

      if (counts[rating] !== undefined) {
        counts[rating]++;
      }
    });

    return counts;

  }, [reviews]);


  /* =====================================================
     FILTER REVIEWS
  ===================================================== */

  const filteredReviews =
    selectedRating === "all"
      ? reviews
      : reviews.filter(
          (review) =>
            Number(review.rating) ===
            Number(selectedRating)
        );


  /* =====================================================
     SHOW 3 OR ALL
  ===================================================== */

  const visibleReviews = showMore
    ? filteredReviews
    : filteredReviews.slice(0, 3);


  /* =====================================================
     ADD NEW REVIEW
  ===================================================== */

  const handleReviewSubmit = (review) => {

    const newReview = {
      ...review,
      id: `review-${Date.now()}`,
    };

    setReviews((current) => [
      newReview,
      ...current,
    ]);

    setShowForm(false);

    setSelectedRating("all");

    setShowMore(false);

  };


  return (

    <section
      id="reviews"
      className="
        border-t
        border-slate-200
        bg-slate-50
        px-4
        py-16
        sm:px-6
        lg:px-8
      "
    >

      <div className="mx-auto max-w-6xl">


        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="mb-8 text-center">

          <span className="
            text-[11px]
            font-black
            uppercase
            tracking-[0.2em]
            text-blue-600
          ">
            Customer Reviews
          </span>

          <h2 className="
            mt-3
            text-3xl
            font-black
            tracking-tight
            text-slate-950
            sm:text-4xl
          ">
            What our customers say
          </h2>

          <p className="
            mx-auto
            mt-3
            max-w-xl
            text-sm
            leading-6
            text-slate-500
          ">
            Your feedback helps us improve our service.
          </p>

        </div>


        {/* =================================================
            RATING SUMMARY + WRITE REVIEW
        ================================================= */}

        <div className="
          mb-8
          grid
          gap-4
          lg:grid-cols-[1fr_210px]
        ">


          {/* Rating Summary */}

          <div className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            sm:p-6
          ">

            <div className="
              flex
              flex-col
              gap-6
              sm:flex-row
              sm:items-center
            ">


              {/* Average */}

              <div className="
                min-w-[110px]
                text-center
                sm:text-left
              ">

                <div className="
                  text-4xl
                  font-black
                  tracking-tight
                  text-slate-950
                ">
                  {averageRating}
                </div>

                <div className="
                  mt-1
                  flex
                  justify-center
                  gap-0.5
                  text-yellow-400
                  sm:justify-start
                ">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      fill="currentColor"
                    />
                  ))}

                </div>

                <p className="
                  mt-1
                  text-[11px]
                  text-slate-400
                ">
                  {reviews.length} reviews
                </p>

              </div>


              {/* Rating Breakdown */}

              <div className="flex-1 space-y-2">

                {[5, 4, 3, 2, 1].map(
                  (rating) => {

                    const count =
                      ratingCounts[rating];

                    const percentage =
                      reviews.length
                        ? (count /
                            reviews.length) *
                          100
                        : 0;

                    const active =
                      Number(selectedRating) ===
                      rating;

                    return (

                      <button
                        key={rating}
                        type="button"
                        onClick={() => {

                          setSelectedRating(
                            active
                              ? "all"
                              : rating
                          );

                          setShowMore(false);

                        }}
                        className={`
                          flex
                          w-full
                          items-center
                          gap-2
                          rounded-lg
                          px-2
                          py-1.5
                          transition
                          ${
                            active
                              ? "bg-slate-100"
                              : "hover:bg-slate-50"
                          }
                        `}
                      >

                        <span className="
                          w-10
                          text-left
                          text-[11px]
                          font-bold
                          text-slate-600
                        ">
                          {rating} ★
                        </span>

                        <div className="
                          h-1.5
                          flex-1
                          overflow-hidden
                          rounded-full
                          bg-slate-100
                        ">

                          <div
                            className="
                              h-full
                              rounded-full
                              bg-yellow-400
                              transition-all
                              duration-300
                            "
                            style={{
                              width:
                                `${percentage}%`,
                            }}
                          />

                        </div>

                        <span className="
                          w-6
                          text-right
                          text-[10px]
                          text-slate-400
                        ">
                          {count}
                        </span>

                      </button>

                    );
                  }
                )}

              </div>

            </div>

          </div>


          {/* Write Review Button */}

          <div className="
            flex
            items-center
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
          ">

            <button
              type="button"
              onClick={() =>
                setShowForm(!showForm)
              }
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
                  Close Form
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
            REVIEW FORM
            UPPER SIDE
        ================================================= */}

        {showForm && (

          <div className="
            mb-8
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            sm:p-6
          ">

            <div className="mb-6">

              <h3 className="
                text-xl
                font-black
                tracking-tight
                text-slate-950
              ">
                Write a Review
              </h3>

              <p className="
                mt-1
                text-xs
                text-slate-500
              ">
                Share your experience with us.
              </p>

            </div>

            <ReviewForm
              onSubmit={handleReviewSubmit}
            />

          </div>

        )}


        {/* =================================================
            ACTIVE FILTER
        ================================================= */}

        {selectedRating !== "all" && (

          <div className="
            mb-5
            flex
            items-center
            justify-between
            gap-3
          ">

            <p className="
              text-xs
              font-bold
              text-slate-600
            ">
              Showing {selectedRating}-star reviews
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedRating("all");
                setShowMore(false);
              }}
              className="
                text-xs
                font-bold
                text-blue-600
              "
            >
              Clear Filter
            </button>

          </div>

        )}


        {/* =================================================
            REVIEW CARDS
        ================================================= */}

        {visibleReviews.length > 0 ? (

          <div className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
            lg:grid-cols-3
          ">

            {visibleReviews.map((review) => (

              <ReviewCard
                key={review.id}
                review={review}
              />

            ))}

          </div>

        ) : (

          <div className="
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-5
            py-12
            text-center
          ">

            <Star
              size={30}
              className="mx-auto text-yellow-400"
            />

            <h3 className="
              mt-3
              text-sm
              font-bold
              text-slate-900
            ">
              No reviews found
            </h3>

            <button
              type="button"
              onClick={() =>
                setSelectedRating("all")
              }
              className="
                mt-2
                text-xs
                font-bold
                text-blue-600
              "
            >
              Show All Reviews
            </button>

          </div>

        )}


        {/* =================================================
            SEE MORE
        ================================================= */}

        {filteredReviews.length > 3 && (

          <div className="
            mt-7
            flex
            justify-center
          ">

            <button
              type="button"
              onClick={() =>
                setShowMore(!showMore)
              }
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
                shadow-sm
                transition
                hover:bg-slate-50
              "
            >

              {showMore
                ? "Show Less"
                : `See More Reviews (${filteredReviews.length - 3})`}

              <ChevronDown
                size={15}
                className={`
                  transition
                  ${showMore
                    ? "rotate-180"
                    : ""}
                `}
              />

            </button>

          </div>

        )}

      </div>

    </section>

  );
}