import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import moment from "moment";

const renderStars = (rating) => {
  return (
    <span>
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
};

const Review = React.memo(({ review }) => {

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
      className="review"
    >
      <div className="review-header flex items-center py-3">
         <span className="review-username text-white">{review.name}</span>
        <img
          src={review.profilePic}
          alt="product_review"
          className="w-12 h-12 ml-2 object-cover rounded-full"
        />
      </div>
      <div className="review-rating">{renderStars(review.rating)}</div>
      <div className="review-details">
        <strong className="text-white text-[17px]">{review.title}</strong>
        <span className="review-date text-slate-400">{moment(review.createdAt).format("ll")}</span>
      </div>
      <div className="review-text text-white">{review.comment}</div>
    </motion.div>
  );
});

export default Review;
