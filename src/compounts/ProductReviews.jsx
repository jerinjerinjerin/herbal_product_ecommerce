import { Button } from "@/components/ui/button";
import { ProductReviewsComment } from "@/data/data";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const renderStars = (rating) => {
  return (
    <span>
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
};

const Review = ({ review }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 50,
      });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="review "
    >
      <div className="review-header">
        <div className="flex hap-2 items-center py-3">
          <span className="review-username">{review.username}</span>
          <img src={review.profileImage} alt="product_review" className="w-8 h-8" />
        </div>
        <div className="review-rating">{renderStars(review.rating)}</div>
      </div>
      <div className="review-details">
        <strong className="text-white text-[17px]">{review.title}</strong>
        <span className="review-date text-slate-400">{review.date}</span>
      </div>
      <div className="review-text text-white">{review.text}</div>
    </motion.div>
  );
};

const ProductReviews = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const toggleShowReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  return (
    <div className="product-reviews p-1 bg-slate-800 px-10 py-10 rounded-md bg-opacity-20 border-[2px] border-green-600">
      <div className="flex justify-between py-4">
        <h2 className="text-xl text-gray-400">Product Reviews</h2>
        <Button className="bg-transparent border border-green-600 text-white rounded-md hover:border-white">
          Add Review
        </Button>
      </div>

      {ProductReviewsComment.slice(
        0,
        showAllReviews ? ProductReviewsComment.length : 5
      ).map((review, index) => (
        <Review key={index} review={review} />
      ))}

      {ProductReviewsComment.length > 5 && (
        <div className="show-more-button mt-5">
          <Button
            onClick={toggleShowReviews}
            className="bg-transparent py-5 border border-green-600 text-white rounded-md hover:border-white"
          >
            {showAllReviews ? "Show Less Reviews" : "Show More Reviews"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
