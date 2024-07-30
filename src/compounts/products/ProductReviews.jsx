import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import backendDomin from "@/commen/api";

const ProductReviews = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const toggleShowReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendDomin}/api/get-product-review/${id}`, {
        withCredentials: "include",
      });

      if (response.data.reviews) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleOpen = () => {
    if (user) {
      setOpenForm(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user && openForm) {
      setOpenForm(false);
    }
  }, [user, openForm]);

  return (
    <div className="product-reviews p-1 bg-slate-800 px-10 py-10 rounded-md bg-opacity-20 border-[2px] border-green-600">
      <div className="flex justify-between py-4">
        <h2 className="text-xl text-gray-400">Product Reviews</h2>
        <Button
          onClick={handleOpen}
          className="bg-transparent border border-green-600 text-white rounded-md hover:bg-green-600"
        >
        Add Review
        </Button>
      </div>

      {reviews.length > 0 ? (
        reviews.slice(
          0,
          showAllReviews ? reviews.length : 5
        ).map((review, index) => (
          <Review key={index} review={review} />
        ))
      ) : (
        <p className="text-gray-400">No reviews available for this product.</p>
      )}

      {reviews.length > 5 && (
        <div className="show-more-button mt-5">
          <Button
            onClick={toggleShowReviews}
            className="bg-transparent py-5 border border-green-600 text-white rounded-md hover:bg-green-600"
          >
            {showAllReviews ? "Show Less Reviews" : "Show More Reviews"}
          </Button>
        </div>
      )}
      
      {openForm && (
        <ReviewForm 
          onClose={() => setOpenForm(false)} 
          userId={user?.data?._id} 
          name={user?.data?.name}
          profilePic={user?.data?.profilePic}
          fetchReviews={fetchReviews}
        />
      )}
    </div>
  );
};

export default ProductReviews;
